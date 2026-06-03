# meshy-mcp-server (creach-t fork)

Fork de [meshy-dev/meshy-mcp-server](https://github.com/meshy-dev/meshy-mcp-server) avec corrections de bugs.

## Fix vs upstream

### image_urls retournées directement après génération d'image

**Problème** : `meshy_text_to_image` et `meshy_image_to_image` retournaient seulement un `task_id` + statut `PENDING`. Il fallait appeler `meshy_get_task_status` manuellement, et même là les URLs n'étaient pas affichées.

**Fix** (3 fichiers) :
- `src/types.ts` : ajout de `image_urls?: string[]` sur `Task`
- `src/tools/image.ts` : poll automatique jusqu'à completion, retourne les URLs directement
- `src/tools/tasks.ts` : affichage de `image_urls` dans `formatTask()` et `buildWaitSuccessResponse()`

## Setup

```bash
git clone https://github.com/creach-t/meshy-mcp-server.git
cd meshy-mcp-server
npm install
npm run build
```

### Config MCP client

```json
{
  "mcpServers": {
    "meshy": {
      "command": "node",
      "args": ["/chemin/vers/meshy-mcp-server/dist/index.js"],
      "env": { "MESHY_API_KEY": "msy_..." }
    }
  }
}
```

## License

MIT — basé sur [meshy-dev/meshy-mcp-server](https://github.com/meshy-dev/meshy-mcp-server)
