//example Friday hook script by Dennis Chow dchow[AT]xtecsystems.com
//GPLv2.0 31-Jul-2020
//create object pointer to function to reference in the interceptor
var IcmpSendEcho2Ex = Module.findExportByName('Iphlpapi.dll', 'IcmpSendEcho2Ex')

//hook into the pointer of our target function
Interceptor.attach(IcmpSendEcho2Ex, {
    onEnter: function (args) {
        send("[+] IcmpSendEcho2Ex API hooked!");
        //snoop on the payload
		//this.RequestData = args[6];
		send("Payload: " + args[6].readAnsiString());
		//change ip address from 1.1.1.1 to google.com
		args[5] = ptr("0x08080808");
		send("New address: " + args[5]);
    },
  onLeave: function (args) {
	  //you dont need anything here unless you want post function routines
	  //create a file on the file system for fun
	  var file = new File("c:\\SFTP_Root\\foobar.txt", "w");
	  file.write("My name is Dennis and I'm learning instrumentation...");
	  file.close();
  }
});