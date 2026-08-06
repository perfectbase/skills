#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const skillsRoot = path.join(root, "skills");
const pluginFile = path.join(root, "plugin.json");
const linkPattern = /!?\[[^\]]*]\(([^)]+)\)/g;
const namePattern = /^name:\s*['"]?([^'"\n]+)['"]?\s*$/m;
const descriptionPattern = /^description:\s*['"]?(.+?)['"]?\s*$/m;
const compatibilityPattern = /^compatibility:\s*['"]?(.+?)['"]?\s*$/m;
const pluginSchema = "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json";
const skillFields = new Set([
  "name",
  "description",
  "license",
  "compatibility",
  "metadata",
  "allowed-tools",
]);
const pluginFields = new Set([
  "$schema",
  "name",
  "version",
  "description",
  "author",
  "homepage",
  "repository",
  "license",
  "keywords",
  "extensions",
]);
const pluginStringFields = [
  "version",
  "description",
  "homepage",
  "repository",
  "license",
];

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function frontmatter(text, file) {
  if (!text.startsWith("---\n")) {
    throw new Error(`${file}: missing opening frontmatter delimiter`);
  }

  const end = text.indexOf("\n---\n", 4);
  if (end === -1) {
    throw new Error(`${file}: missing closing frontmatter delimiter`);
  }

  return text.slice(4, end);
}

function checkLocalLinks(file, text) {
  const errors = [];

  for (const match of text.matchAll(linkPattern)) {
    const target = match[1].trim().split(/\s+/, 1)[0].replace(/^<|>$/g, "");
    if (
      !target ||
      target.startsWith("#") ||
      target.startsWith("http://") ||
      target.startsWith("https://") ||
      target.startsWith("mailto:")
    ) {
      continue;
    }

    const relative = target.split("#", 1)[0];
    if (relative && !fs.existsSync(path.resolve(path.dirname(file), relative))) {
      errors.push(`${file}: broken local link: ${target}`);
    }
  }

  return errors;
}

function walkMarkdown(directory) {
  const files = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(entry.name)) {
      continue;
    }
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdown(entryPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(entryPath);
    }
  }

  return files;
}

const errors = [];
const warnings = [];
const names = new Map();

if (!fs.existsSync(pluginFile)) {
  errors.push(`${pluginFile}: missing Agent Plugins manifest`);
} else {
  let plugin;
  try {
    plugin = JSON.parse(fs.readFileSync(pluginFile, "utf8"));
  } catch (error) {
    errors.push(`${pluginFile}: invalid JSON: ${error.message}`);
  }

  if (!isObject(plugin)) {
    errors.push(`${pluginFile}: manifest must contain a JSON object`);
  } else {
    if (plugin.$schema !== pluginSchema) {
      errors.push(`${pluginFile}: $schema must be ${JSON.stringify(pluginSchema)}`);
    }
    if (
      typeof plugin.name !== "string" ||
      !/^[a-z0-9](?:[a-z0-9.-]{0,62}[a-z0-9])?$/.test(plugin.name) ||
      plugin.name.includes("--") ||
      plugin.name.includes("..")
    ) {
      errors.push(`${pluginFile}: invalid Agent Plugins name`);
    }
    for (const field of Object.keys(plugin)) {
      if (!pluginFields.has(field)) {
        errors.push(`${pluginFile}: unknown top-level field ${JSON.stringify(field)}`);
      }
    }
    for (const field of pluginStringFields) {
      if (field in plugin && typeof plugin[field] !== "string") {
        errors.push(`${pluginFile}: ${field} must be a string`);
      }
    }
    if ("author" in plugin) {
      if (!isObject(plugin.author)) {
        errors.push(`${pluginFile}: author must be an object`);
      } else {
        for (const [field, value] of Object.entries(plugin.author)) {
          if (!["name", "email", "url"].includes(field)) {
            errors.push(`${pluginFile}: unknown author field ${JSON.stringify(field)}`);
          } else if (typeof value !== "string") {
            errors.push(`${pluginFile}: author.${field} must be a string`);
          }
        }
      }
    }
    if (
      "keywords" in plugin &&
      (!Array.isArray(plugin.keywords) ||
        plugin.keywords.some((keyword) => typeof keyword !== "string"))
    ) {
      errors.push(`${pluginFile}: keywords must be an array of strings`);
    }
    if ("extensions" in plugin && !isObject(plugin.extensions)) {
      errors.push(`${pluginFile}: extensions must be an object`);
    }
  }
}

if (!fs.existsSync(skillsRoot)) {
  errors.push(`${skillsRoot}: missing skills directory`);
} else {
  const directories = fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name));

  for (const directory of directories) {
    const directoryPath = path.join(skillsRoot, directory.name);
    const skillFile = path.join(directoryPath, "SKILL.md");
    const readmeFile = path.join(directoryPath, "README.md");

    if (!fs.existsSync(skillFile)) {
      errors.push(`${directoryPath}: missing SKILL.md`);
      continue;
    }
    if (!fs.existsSync(readmeFile)) {
      errors.push(`${directoryPath}: missing README.md`);
    }

    const text = fs.readFileSync(skillFile, "utf8").replaceAll("\r\n", "\n");
    let header;
    try {
      header = frontmatter(text, skillFile);
    } catch (error) {
      errors.push(error.message);
      continue;
    }

    const name = header.match(namePattern)?.[1].trim();
    const description = header.match(descriptionPattern)?.[1].trim();
    const compatibility = header.match(compatibilityPattern)?.[1].trim();
    const fields = new Map();

    for (const match of header.matchAll(/^([A-Za-z][A-Za-z0-9-]*):/gm)) {
      const field = match[1];
      if (fields.has(field)) {
        errors.push(`${skillFile}: duplicate frontmatter field ${JSON.stringify(field)}`);
      }
      fields.set(field, true);
      if (!skillFields.has(field)) {
        warnings.push(`${skillFile}: nonportable frontmatter field ${JSON.stringify(field)}`);
      }
    }

    if (!name) {
      errors.push(`${skillFile}: missing name`);
    } else {
      if (
        name.length > 64 ||
        !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(name) ||
        name.includes("--")
      ) {
        errors.push(`${skillFile}: invalid Agent Skills name ${JSON.stringify(name)}`);
      }
      if (name !== directory.name) {
        errors.push(
          `${skillFile}: name ${JSON.stringify(name)} does not match ${JSON.stringify(directory.name)}`,
        );
      }
      if (names.has(name)) {
        errors.push(`${skillFile}: duplicate name also used by ${names.get(name)}`);
      }
      names.set(name, skillFile);
    }

    if (!description) {
      errors.push(`${skillFile}: missing description`);
    } else if (description.length > 1024) {
      errors.push(`${skillFile}: description exceeds 1024 characters`);
    }

    if (fields.has("compatibility")) {
      if (!compatibility) {
        errors.push(`${skillFile}: compatibility must be a non-empty single-line string`);
      } else if (compatibility.length > 500) {
        errors.push(`${skillFile}: compatibility exceeds 500 characters`);
      }
    }

    if (text.split("\n").length - 1 > 500) {
      warnings.push(`${skillFile}: SKILL.md exceeds the recommended 500 lines`);
    }
  }
}

for (const markdown of walkMarkdown(root).sort()) {
  errors.push(...checkLocalLinks(markdown, fs.readFileSync(markdown, "utf8")));
}

for (const warning of warnings) {
  console.warn(`warning: ${warning}`);
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`error: ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Validated the Agent Plugins manifest, ${names.size} skills, and all local Markdown links with ${warnings.length} warning${warnings.length === 1 ? "" : "s"}.`,
  );
}
