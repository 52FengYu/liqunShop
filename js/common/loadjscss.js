/**
 * 动态加载JS
 * @param {string} url 脚本地址
 * @param {function} callback  回调函数
 */
function LoadJs(url, callback)
{
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = url;
    if (typeof (callback) == 'function')
    {
        script.onload = script.onreadystatechange = function ()
        {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")
            {
                callback();
                script.onload = script.onreadystatechange = null;
            }
        };
    }
    head.appendChild(script);
}

/**
 * 动态加载CSS
 * @param {string} url 样式地址
 */
function LoadCss(url, callback)
{
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    if (typeof (callback) == 'function')
    {
        link.onload = link.onreadystatechange = function ()
        {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")
            {
                callback();
                link.onload = link.onreadystatechange = null;
            }
        };
    }
    head.appendChild(link);

}