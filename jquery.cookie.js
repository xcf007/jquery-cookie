(function ($) {
    var defaults = {
        expires: 0,
        path: '',
        domain: '',
        secure: 0,
        debug: '' //all-(console.log or window.alert) log-(console.log or nothing) alert-(all window.alert)
    };
    
    //读取Cookie
    function getCookie(name) {
        if (document.cookie) {
            var cookies = document.cookie.split(';'),
                i;
            var length = cookies.length,
                nameLength = name.length;
            for (i = 0; i < length; i++) {
                var cookie = $.trim(cookies[i]);
                if (cookie.substring(0, nameLength + 1) == (name + '=')) {
                    return decodeURIComponent(cookie.substring(nameLength + 1));
                }
            }
        }
        return null;
    }
    
    //设置Cookie
    function setCookie(name, value, options) {
        var o = $.extend(defaults, options);
        var expires = o.expires == 0 ? '' : o.expires;
        var path = o.path ? '; path=' + o.path : '';
        var domain = o.domain ? '; domain=' + o.domain : '';
        var secure = o.secure ? '; secure' : '';
        if(expires) {
            var date = new Date();
            date.setDate(date.getDate() + expires);
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + encodeURIComponent(value) + expires + path + domain + secure;
    }
    
    //删除Cookie
    function deleteCookie(name) {
        setCookie(name, null);
    }
    
    $.extend({
        cookie: function(method, name, param) {
            switch(method){
                case 'get':
                    return getCookie(name);
                case 'set':
                    setCookie(name, param.value, param.options);
                    break;
                case 'delete':
                    deleteCookie(name);
                    break;
                default:
                    break;
            }
        }
    });
})(jQuery);