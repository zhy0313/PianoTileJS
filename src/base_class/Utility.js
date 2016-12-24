var Utility = Utility || {};
Utility.executeFunction = function (cbFunc) {
    if (!cbFunc) {
        return null;
    }
    if (cbFunc.hasOwnProperty('caller')
        && cbFunc.hasOwnProperty('funcName')
        && cbFunc.hasOwnProperty('args')) {
        cbFunc.funcName.apply(cbFunc.caller, cbFunc.args);
        cbFunc = null;
    } else if (cbFunc instanceof Function) {
        cbFunc();
    } else {
        cc.error("execute call back with none type function");
    }
};
Utility.getColorByName = function (name) {
    if (!cc.isString(name)) return cc.color.WHITE;

    name = name.toLowerCase();
    var color = cc.color.WHITE;
    switch (name) {
        case 'green':
            color = cc.color.GREEN;
            break;
        case 'red':
            color = cc.color.RED;
            break;
        case 'violet':
            color = cc.color(238, 130, 238);
            break;
        case 'yellow':
            color = cc.color.YELLOW;
            break;
        case 'brown':
            color = cc.color(139, 69, 19);
            break;
        case 'black':
            color = cc.color.BLACK;
            break;
        case 'white':
            color = cc.color.WHITE;
            break;
        case 'blue':
            color = cc.color.BLUE;
            break;
        case 'orange':
            color = cc.color.ORANGE;
            break;
        case 'fire_brick': // red
            color = cc.color(178, 34, 34);
            break;
        case 'salmon': // red
            color = cc.color(250, 128, 114);
            break;
        case 'orange_red': // red
            color = cc.color(255, 69, 0);
            break;
        case 'olive': // green
            color = cc.color(128, 128, 0);
            break;
        case 'lawn_green': // green
            color = cc.color(124, 252, 0);
            break;
        case 'dark_green': // green
            color = cc.color(0, 100, 0);
            break;
        case 'pale_green': // green
            color = cc.color(152, 251, 152);
            break;
        case 'teal': // blue
            color = cc.color(0, 128, 128);
            break;
        case 'cyan': // blue
            color = cc.color(152, 255, 255);
            break;
        case 'aqua_marine': // blue
            color = cc.color(127, 255, 212);
            break;
        case 'sky_blue': // blue
            color = cc.color(135, 206, 235);
            break;
        case 'midnight_blue': // blue
            color = cc.color(25, 25, 112);
            break;
        case 'royal_blue': // blue
            color = cc.color(65, 105, 225);
            break;
        case 'dark_orchid': // blue
            color = cc.color(153, 50, 204);
            break;
        case 'gray': // gray
        case 'grey': // gray
            color = cc.color(128, 128, 128);
            break;
        case 'bisque': // light
            color = cc.color(255, 228, 196);
            break;
        case 'light_pink': // light pink
            color = cc.color(235, 190, 247);
            break;
        case 'dirt_milk':
            color = cc.color(249, 243, 131);
            break;
        case 'text_green':
            color = cc.color(97, 222, 3);
            break;
        case 'lock':
            color = cc.color(190, 197, 253);
            break;
        case 'unlock':
            color = cc.color(246, 237, 169);
            break;
        case 'tooltip':
            color = cc.color(248, 237, 184);
            break;
        case 'tooltip_title':
            color = cc.color(234, 120, 122);
            break;
        case 'stroke':
            color = cc.color(39, 17, 10);
            break;
        case 'text_gold':
            color = cc.color("#FFF6D5");
            break;
        case 'text_blue_diamond':
            color = cc.color("#E6AAFC");
            break;
        default :
            cc.warn("COLOR = %s NOT FOUND", name);
            break;
    }

    return color;
};
Utility.getLabel = function (fontName, fontSize, color, isSkipStroke) {
    if (!fontName) {
        fontName = res.FONT_ARIAL;
    }
    if (!fontSize) {
        fontSize = 24;
    }
    if (!color) {
        color = Utility.getColorByName("tooltip");
    }
    var label = new ccui.Text("", fontName, fontSize);
    label.color = color;
    label.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
    label.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
    label.enableShadow(Utility.getColorByName('grey'), {width: 0, height: -2}, 1);
    if (!isSkipStroke) {
        label.enableOutline(Utility.getColorByName('stroke'), 1);
    }
    return label;
};
Utility.numToStr = function (num, separator) {
    if (num === undefined) {
        cc.error("numToStr with undefined");
        return "0";
    }
    if(!separator) {
        separator = ",";
    }
    if(!Utility.listSeparatorNumString) {
        Utility.listSeparatorNumString = [];
    }
    var isExisted = Utility.listSeparatorNumString.find(function (obj) {
        return obj == separator;
    });
    if(!isExisted){
        Utility.listSeparatorNumString.push(separator);
    }
    var strNum = "";
    var strNumOrigin = num.toString();
    var isNegative = false;
    if (num < 0) {
        isNegative = true;
        strNumOrigin = strNumOrigin.slice(1, strNumOrigin.length);
    }
    var lengthStrExp = strNumOrigin.length;
    var numOfDot = Math.floor(lengthStrExp / 3 - 0.1);
    switch (numOfDot) {
        case 0:
            strNum = strNumOrigin;
            break;
        case 1:
            strNum = strNumOrigin.slice(0, strNumOrigin.length - 3) + separator + strNumOrigin.slice(strNumOrigin.length - 3, strNumOrigin.length);
            break;
        case 2:
            strNum = strNumOrigin.slice(0, strNumOrigin.length - 6) + separator + strNumOrigin.slice(strNumOrigin.length - 6, strNumOrigin.length - 3)
                + separator + strNumOrigin.slice(strNumOrigin.length - 3, strNumOrigin.length);
            break;
        case 3:
            strNum = strNumOrigin.slice(0, strNumOrigin.length - 9) + separator + strNumOrigin.slice(strNumOrigin.length - 9, strNumOrigin.length - 6)
                + separator + strNumOrigin.slice(strNumOrigin.length - 6, strNumOrigin.length - 3) + separator + strNumOrigin.slice(strNumOrigin.length - 3, strNumOrigin.length);
            break;
        default:
            strNum += "1.000.000.000";

            break;
    }

    if (isNegative) {
        strNum = "-" + strNum;
    }
    return strNum;
};
Utility.strToNum = function (str) {
    var list = Utility.listSeparatorNumString;
    var len = list.length;
    for(var i = 0; i < len; ++i) {
        var s = list[i];
        while (str.search(s) > 0) {
            str.replace(s, "");
        }
    }
    return str;
};
Utility.getActionLoading = function (obj, content) {
    var delayTime = 0.3;
    obj && obj.stopAllActions && obj.stopAllActions();
    return cc.sequence(
        cc.spawn(
            cc.callFunc(function () {
                obj && obj.setString && obj.setString(content + "");
            }),
            cc.fadeIn(delayTime)
        ),
        cc.delayTime(delayTime),
        cc.callFunc(function () {
            obj && obj.setString && obj.setString(content + ".");
        }),
        cc.delayTime(delayTime),
        cc.callFunc(function () {
            obj && obj.setString && obj.setString(content + "..");
        }),
        cc.delayTime(delayTime),
        cc.spawn(
            cc.callFunc(function () {
                obj && obj.setString && obj.setString(content + "...");
            }),
            cc.fadeOut(delayTime)
        ),
        cc.delayTime(delayTime)
    ).repeatForever();
};