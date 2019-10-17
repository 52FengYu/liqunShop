var isDebug = true;

function DebugRoute() {
	if (isDebug) {
		WebRoute.Host = WebRoute.DebugHost;
		JSRoute.Host = JSRoute.DebugHost;
		CSSRoute.Host = CSSRoute.DebugHost;
		ImageRoute.Host = ImageRoute.DebugHost;
		Service.Host = Service.DebugHost;
	}
}
