Thermal printer controlled with JavaScript using ESC/POS over HTTP.

### Important Bits:

1. The printer connection is done in `./lib/printer.ts` - now uses HTTP to send print jobs to the thermal-server
2. The Photobooth printing is done in `./actions/print.ts` and the UI is in `./components/PhotoBooth.tsx`
3. The Chat printing is done in `./lib/chat.ts`, the AI "Toxic message" detection in `./lib/sfw.ts` and the UI in `./components/ChatForm.tsx`.
4. The Sentry issue + screenshotting is done in `./lib/sentry.ts`

### Environment Variables:

- `PRINTER_URL` - The URL of the thermal printer server (defaults to `http://192.168.1.212:4000`)
- `NO_PRINTER` - Set to `"true"` to skip printing (useful for development)

I'm using a [Rongta 80mm](https://amzn.to/3SXqX94) Receipt printer, but almost any one will do as they all operate on ESC/POS. The printer connects to the thermal-server which handles the actual TCP socket connection.
