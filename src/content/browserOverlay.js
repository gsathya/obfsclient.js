Cu.import("resource://gre/modules/XPCOMUtils.jsm");
Cu.import("resource://gre/modules/NetUtil.jsm");

/**
 * XULSchoolChrome namespace.
 */
if ("undefined" == typeof(XULSchoolChrome)) {
  var XULSchoolChrome = {};
};

/**
 * Controls the browser overlay for the Hello World extension.
 */
XULSchoolChrome.BrowserOverlay = {
  /**
   * Says 'Hello' to the user.
   */
  sayHello : function(aEvent) {
      let stringBundle = document.getElementById("xulschoolhello-string-bundle");
      let message = stringBundle.getString("xulschoolhello.greeting.label");
      
      //window.alert(message);
      window.alert(message);
      window.console.log("hi");
      this.tcpConnect("http://www.google.com", 80, "HEAD / HTTP/1.0\n\n");
  },

  tcpConnect : function(uri,port,header){
      var listener = {
          finished : function(packet){
              if(packet) {
                  portstate = '';
                  packet.split("\r\n");
                  packetset = packet[8]+packet[9]+packet[10]+packet[11];
                  portstate = 'open';
              } else { portstate = 'closed'; }
              if(portstate == 'closed') {} else {
                  window.alert("\n"+port+"\ntcp "+portstate);
              }
          },
      };
      window.alert("tcpConnect");
      this.readSocket(uri,port,header,listener);
  },

  readSocket : function(host,port,outputData,listener) {
      window.alert("readSocket");
      var transportService = Components.classes["@mozilla.org/network/socket-transport-service;1"].getService(Components.interfaces.nsISocketTransportService);
      var transport = transportService.createTransport(["starttls"],0,host,port,null);

      var outstream = transport.openOutputStream(0,0,0);
      outstream.write(outputData,outputData.length);
      
      var stream = transport.openInputStream(0,0,0);
      var instream = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);
      instream.init(stream);
      
      var dataListener = {
          data : "",
          onStartRequest: function(request, context){},
          onStopRequest: function(request, context, status){
              instream.close();
              outstream.close();
              return listener.finished(this.data);
              
          },
          onDataAvailable: function(request, context, inputStream, offset,
                                    count){
              this.data += instream.read(count);
          },
      };
      
      var pump = Components.classes["@mozilla.org/network/input-stream-pump;1"].createInstance(Components.interfaces.nsIInputStreamPump);
      pump.init(stream, -1, -1, 0, 0, false);
      pump.asyncRead(dataListener,null);
      
      return null;
  } 
};
