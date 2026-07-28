#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const skillsRoot = path.join(root, "skills");
const linkPattern = /!?\[[^\]]*]\(([^)]+)\)/g;
const namePattern = /^name:\s*['"]?([^'"\n]+)['"]?\s*$/m;
const descriptionPattern = /^description:\s*['"]?(.+?)['"]?\s*$/m;

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
const names = new Map();

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

    const text = fs.readFileSync(skillFile, "utf8");
    let header;
    try {
      header = frontmatter(text, skillFile);
    } catch (error) {
      errors.push(error.message);
      continue;
    }

    const name = header.match(namePattern)?.[1].trim();
    const description = header.match(descriptionPattern)?.[1].trim();

    if (!name) {
      errors.push(`${skillFile}: missing name`);
    } else {
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
    }
  }
}

for (const markdown of walkMarkdown(root).sort()) {
  errors.push(...checkLocalLinks(markdown, fs.readFileSync(markdown, "utf8")));
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`error: ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Validated ${names.size} skills and all local Markdown links.`);
}
