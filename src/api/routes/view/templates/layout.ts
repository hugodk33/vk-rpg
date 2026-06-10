export function layout(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} - VKRPG</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-zinc-900 text-zinc-100 min-h-screen">
  ${content}
</body>
</html>`
}
