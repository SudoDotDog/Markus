# Markus - Permission

To create permission config, modify `markus.conf` file, add `authorization` as a `array` of `string` to the JSON structure.

```json
"authorization": [
    'first-key',
    'second-key',
    'third-key'
]
```

You can add as much keys as you want to it. Use any key of these could pass the auth middware that `authPosition` property is not defineded.

```typescript
class someRoute implements IExpressRoute {
    public readonly authPosition: number[] = [0, 2];
}
```

If `authPosition` position is defineded, middleware will only pass if position is matched, for example with this route and config, this route will only accept request with `key: 'first-key'` or `key: 'third-key'`.

