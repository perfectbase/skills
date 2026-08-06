# skills

A personal collection of agent skills for Codex, Claude Code, Cursor, and other harnesses that support the [Agent Skills](https://agentskills.io/) format. The repository is also packaged as an [Agent Plugin](https://agent-plugins.org/) so compatible clients can discover the collection through the portable plugin standard.

The collection is intentionally small and opinionated. Each skill can be installed independently.

## Skills

| Skill | What it does |
| --- | --- |
| [`batch-grill-me`](skills/batch-grill-me/) | Interviews across every currently answerable branch of a design tree, round by round.<br><sub>Credit: [Matt Pocock](https://github.com/mattpocock)</sub> |
| [`delegate-thermo-review`](skills/delegate-thermo-review/) | Delegates a strict maintainability review to a subagent and discusses its findings.<br><sub>Credit: [Cursor](https://github.com/cursor)</sub> |
| [`grill-me`](skills/grill-me/) | Stress-tests a plan, decision, or idea one question at a time.<br><sub>Credit: [Matt Pocock](https://github.com/mattpocock)</sub> |
| [`html-plan`](skills/html-plan/) | Produces grounded, self-contained interactive HTML implementation plans.<br><sub>Credit: [Builder.io](https://github.com/BuilderIO)</sub> |
| [`html-recap`](skills/html-recap/) | Turns completed work into a self-contained interactive HTML recap.<br><sub>Credit: [Builder.io](https://github.com/BuilderIO)</sub> |
| [`interactive-review`](skills/interactive-review/) | Reviews code changes interactively, one architecture and data-flow section at a time. |
| [`publish-pr`](skills/publish-pr/) | Commits, pushes, and opens a typed draft pull request.<br><sub>Credit: [OpenAI](https://github.com/openai)</sub> |
| [`slice-implement`](skills/slice-implement/) | Implements reviewable work as prefixed stacked pull requests and babysits CI until green. |
| [`thermo-nuclear-code-quality-review`](skills/thermo-nuclear-code-quality-review/) | Runs an exceptionally strict maintainability and code-structure review.<br><sub>Credit: [Cursor](https://github.com/cursor)</sub> |
| [`writing-great-skills`](skills/writing-great-skills/) | Provides a vocabulary and principles for writing predictable agent skills.<br><sub>Credit: [Matt Pocock](https://github.com/mattpocock)</sub> |

## Install

Install interactively with the Agent Skills CLI:

```sh
npx skills add perfectbase/skills
```

Install one skill globally:

```sh
npx skills add perfectbase/skills --skill grill-me --global
```

Or copy a skill manually into the skill directory used by your harness:

```sh
cp -R skills/grill-me ~/.agents/skills/
```

Common destinations include:

- Codex: `~/.agents/skills/`
- Claude Code: `~/.claude/skills/`
- Cursor: `~/.agents/skills/` or `~/.cursor/skills/`

## Compatibility

The root [`plugin.json`](plugin.json) identifies this repository as an Agent Plugins 1.0 package. Compatible clients discover each immediate child of `skills/` as an independent skill.

Every skill directory is centered on a `SKILL.md`. A few skills retain harness-specific frontmatter where it controls invocation behavior. Optional Codex presentation and invocation settings live in `agents/openai.yaml`.

Run the repository checks with:

```sh
node scripts/check.mjs
```

## Credits and licensing

Several skills build on work by other creators. See [CREDITS.md](CREDITS.md) and the README inside each skill directory for direct source links.

Original work in this repository is available under the [MIT License](LICENSE). Third-party material remains subject to the notices included beside the affected skills.
