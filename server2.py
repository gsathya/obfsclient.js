import SimpleHTTPServer
import SocketServer

SimpleHTTPServer.SimpleHTTPRequestHandler.extensions_map['.xpi'] = 'application/x-xpinstall'

httpd = SocketServer.TCPServer(("", 3000), SimpleHTTPServer.SimpleHTTPRequestHandler)

httpd.serve_forever()
