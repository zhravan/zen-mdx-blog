# Code Language Badge Plugin

Displays language badges on code blocks with icons to help readers quickly identify the programming language.

## Quick Start

Enable in `config/plugins.yaml`:

```yaml
code-language-badge:
  enabled: true
  showIcon: true           # Show lucide-react icons
  style: "default"         # Options: "default", "minimal", "pill"
```

## Usage

Just write your code blocks with language identifiers:

````markdown
```typescript
const greeting: string = "Hello, World!";
```
````

The badge automatically appears at the **bottom-right** of the code block.

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | boolean | `false` | Enable/disable the plugin |
| `showIcon` | boolean | `true` | Display Lucide icons with language names |
| `style` | string | `"default"` | Badge style: `"default"`, `"minimal"`, or `"pill"` |

## Badge Styles

- **default**: Semi-transparent with backdrop blur
- **minimal**: Transparent with subtle text
- **pill**: Accent-colored with rounded corners

## Supported Languages

Pre-configured support for **60+ languages** including:

**Web**: JavaScript, TypeScript, JSX, TSX, HTML, CSS, SCSS  
**Backend**: Python, Java, Go, Rust, C, C++, C#, PHP, Ruby  
**Shell**: Bash, Zsh, Fish, PowerShell  
**Data**: JSON, YAML, SQL, GraphQL  
**Other**: Docker, Markdown, LaTeX, and more

Unknown languages are automatically handled with a default icon.

## How It Works

1. Detects language from code block syntax
2. Matches to pre-configured language with icon
3. Renders badge at bottom-right corner
4. Works seamlessly with copy button (top-right) and other code features

## Customization

### Adding Custom Languages

Edit `lib/plugins/code-language-badge.ts`:

```typescript
const LANGUAGE_MAP: Record<string, { name: string; icon?: string }> = {
  mylang: { name: 'MyLanguage', icon: 'Rocket' }, // Lucide icon name
  // ... existing languages
};
```

### Custom Badge Styles

Modify `getBadgeStyles()` in `lib/plugins/code-language-badge.ts` to customize appearance.

## Troubleshooting

**Badge not showing?**
- Ensure plugin is enabled in `config/plugins.yaml`
- Verify code block has language identifier (e.g., ` ```typescript `)
- Clear cache: `rm -rf .next && pnpm dev`

**Need different position?**
- Edit `getBadgeStyles()` in `lib/plugins/code-language-badge.ts`
- Change `bottom` and `right` values

## Files

- `lib/plugins/code-language-badge.ts` - Plugin logic & configuration
- `components/mdx/LanguageBadge.tsx` - Badge UI component  
- `components/mdx/Code.tsx` - Code block integration
- `config/plugins.yaml` - User settings
