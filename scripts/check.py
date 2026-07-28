#!/usr/bin/env python3
"""Validate the repository's skill structure and local Markdown links."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
SKILLS = ROOT / "skills"
LINK_RE = re.compile(r"!?\[[^\]]*]\(([^)]+)\)")
NAME_RE = re.compile(r"^name:\s*['\"]?([^'\"\n]+)['\"]?\s*$", re.MULTILINE)
DESCRIPTION_RE = re.compile(
    r"^description:\s*(?:['\"]?)(.+?)(?:['\"]?)\s*$", re.MULTILINE
)
ATTRIBUTED_SKILLS = {
    "batch-grill-me",
    "delegate-thermo-review",
    "grill-me",
    "html-plan",
    "html-recap",
    "publish-pr",
    "thermo-nuclear-code-quality-review",
    "writing-great-skills",
}
LICENSED_SKILLS = ATTRIBUTED_SKILLS - {"delegate-thermo-review"}


def frontmatter(text: str, path: Path) -> str:
    if not text.startswith("---\n"):
        raise ValueError(f"{path}: missing opening frontmatter delimiter")
    end = text.find("\n---\n", 4)
    if end == -1:
        raise ValueError(f"{path}: missing closing frontmatter delimiter")
    return text[4:end]


def local_links(path: Path, text: str) -> list[str]:
    errors: list[str] = []
    for match in LINK_RE.finditer(text):
        target = match.group(1).strip().split(maxsplit=1)[0].strip("<>")
        if (
            not target
            or target.startswith(("#", "http://", "https://", "mailto:"))
        ):
            continue
        relative = target.split("#", 1)[0]
        if relative and not (path.parent / relative).resolve().exists():
            errors.append(f"{path}: broken local link: {target}")
    return errors


def main() -> int:
    errors: list[str] = []
    names: dict[str, Path] = {}

    if not SKILLS.is_dir():
        errors.append(f"{SKILLS}: missing skills directory")
    else:
        for directory in sorted(path for path in SKILLS.iterdir() if path.is_dir()):
            skill_file = directory / "SKILL.md"
            readme = directory / "README.md"
            if not skill_file.is_file():
                errors.append(f"{directory}: missing SKILL.md")
                continue
            if not readme.is_file():
                errors.append(f"{directory}: missing README.md")
            else:
                readme_text = readme.read_text(encoding="utf-8")
                if (
                    directory.name in ATTRIBUTED_SKILLS
                    and not readme_text.startswith(">")
                ):
                    errors.append(f"{readme}: attribution must appear at the top")
            if (
                directory.name in LICENSED_SKILLS
                and not (directory / "LICENSE.upstream").is_file()
            ):
                errors.append(f"{directory}: missing LICENSE.upstream")

            text = skill_file.read_text(encoding="utf-8")
            try:
                header = frontmatter(text, skill_file)
            except ValueError as error:
                errors.append(str(error))
                continue

            name_match = NAME_RE.search(header)
            description_match = DESCRIPTION_RE.search(header)
            if not name_match:
                errors.append(f"{skill_file}: missing name")
            else:
                name = name_match.group(1).strip()
                if name != directory.name:
                    errors.append(
                        f"{skill_file}: name {name!r} does not match {directory.name!r}"
                    )
                if name in names:
                    errors.append(f"{skill_file}: duplicate name also used by {names[name]}")
                names[name] = skill_file
            if not description_match or not description_match.group(1).strip():
                errors.append(f"{skill_file}: missing description")

    for markdown in sorted(ROOT.rglob("*.md")):
        errors.extend(local_links(markdown, markdown.read_text(encoding="utf-8")))

    if errors:
        print("\n".join(f"error: {error}" for error in errors), file=sys.stderr)
        return 1

    print(f"Validated {len(names)} skills and all local Markdown links.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
