//初始化舞台
Laya.init(1334,750,Laya.WebGL);
//背景颜色
Laya.stage.bgColor = "#1b2436";
//创建缓动文本
createTween();
function createTween(){
    //"LayaBox"字符串总宽度
    var w = 800;
    //文本创建的起始x位置(>>在此使用右移运算符，相当于/2 用>>效率更高)
    var offsetX = Laya.stage.width - w >> 1;
    //显示的字符串
    var demoString = "LayaBox";
    var letterText;
    for(var i = 0,len = demoString.length;i<len;++i){
        //从"LayaBox"字符串中逐个提出单个字符创建文本
        letterText = createLetter(demoString.charAt(i));
        letterText.x = w/len*i+offsetX;
        //文本的初始y属性
        letterText.y = 100;
        //对象letterText属性y从缓动目标的100向初始的y属性300运动，每次执行缓动效果需要3000毫秒，缓类型采用elasticOut函数方式，延迟间隔i*100毫秒执行。
        // Laya.Tween.from(letterText,{y:100},3000,Laya.Ease.elasticInOut,null,i*1000);
        // Laya.Tween.to(letterText,{y:300},1000,Laya.Ease.elasticInOut,null,i*300);
        Laya.Tween.to(letterText, 
                      { 
                          y : 300 ,
                          update:new Laya.Handler(this,updateColor,[letterText])
                      },
                      1000,
                      Laya.Ease.elasticOut, 
                      Laya.Handler.create(this,changeColor,[letterText]), 
                      i * 100
                      );
    }
}
function updateColor(txt){
   var c = Math.floor(Math.random()*3);
    switch (c) {
        case 0:
            txt.color = "#eee000";
            break;
        case 1:
            txt.color = "#ffffff";
            break;
        case 2:
            txt.color = "#ff0000";
            break;
        default:
            txt.color = "#eee000";
            break;
    }
}

function changeColor(txt){
    txt.color = "#ooffff";
}
//创建单个字符文本，并加载到舞台
function createLetter(char){
    var letter = new Laya.Text();
    letter.text = char;
    letter.color = "#ffffff";
    letter.font = "Impact";
    letter.fontSize = 180;
    Laya.stage.addChild(letter);
    return letter;
}