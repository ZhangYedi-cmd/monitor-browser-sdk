export interface AppInfo {
    name: string;
    email: string
}

export interface CoreContentType {
    appInfo: AppInfo;
    uploadUrl: string;
    enable: boolean
}

export interface BasePluginType {
    enable: boolean;
    name: string;
    monitor: (any) => any;
    transform?: (any) => any
}

export interface UnKnowCallback {

}