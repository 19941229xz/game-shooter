/*	加载的图片资源字典	*/
var srcObj = {
    player: "o_player4.png",
    ground: "o_ground.png",
    wall1: "o_wall5.png",
    wall2: "o_wall7.png",
    redDoor0: "o_redDoor.png",
    redDoor: "o_redDoor.png",
	greenDoor0: "o_greenDoor.png",
    greenDoor: "o_greenDoor.png",
	blueDoor0: "o_blueDoor.png",
    blueDoor: "o_blueDoor.png",
	redKey0: "o_redKey0.png",
    redKey: "o_redKey.png",
	redKey1: "o_redKey1.png",
    greenKey0: "o_greenKey0.png",
    greenKey: "o_greenKey.png",
	greenKey1: "o_greenKey1.png",
    blueKey0: "o_blueKey0.png",
    blueKey: "o_blueKey.png",
	blueKey1: "o_blueKey1.png",
    enemy0:"o_enemy0.png",
    enemy_night: "o_enemyAA_night.png",  // 敌人晚上皮肤
    enemy: "o_enemyAA.png",
    enemy1:"enemy1AA.png",
    enemy1_night:"enemy1AA_night.png",
    hurt:"o_hurt.png",
    protectZhao_night:"protect_night.png",
    protectZhao:"protect.png",
    star:"o_star.png",
    star_night:"o_star_night.png",
	pl:"o_player10.png",
	enemy10_night:"o_enemyDie_night.png",
	enemy10:"o_enemyDie.png",
	life:"o_life.png",
	destination:"o_destinationAA.png",
	night:"night.png"
  
  
 };
/*	地图矩阵	*/
var mapMatrix = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 9, 2],
  [2, 0, 1, 0, 0, 1, 2, 2, 2, 1, 1, 0, 0, 1, 0, 1, 0, 2],
  [2, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 2],
  [2, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 2],
  [2, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 2],
  [2, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 2, 0, 1, 0, 2, 0, 2],
  [2, 2, 2, 2, 2, 1, 1, 3, 1, 1, 1, 2, 1, 2, 0, 2, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 1, 5, 2],
  [2, 0, 2, 2, 2, 2, 2, 0, 1, 1, 0, 1, 1, 0, 2, 2, 0, 2],
  [2, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 4, 0, 0, 0, 0, 2],
  [2, 0, 1, 0, 0, 0, 1, 0, 1, 2, 0, 1, 1, 1, 1, 1, 0, 2],
  [2, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2],
  [2, 0, 1, 0, 1, 0, 2, 1, 1, 2, 0, 2, 2, 2, 1, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 2],
  [2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 0, 1, 0, 0, 2],
  [2, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 2, 1, 0, 0, 2],
  [2, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 2, 1, 0, 0, 2],
  [2, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];


cnGame.init("canvas", { width: 360, height: 400 });//初始化框架
var canvasTest = document.getElementById("screenCanvas");//获取显示3dplayer玩家的canvas
var canvasMap = document.getElementById("canvas");//获取显示地图的canvas
canvasMap.getContext("2d").globalAlpha=0.8
canvasMap.style.position='absolute'
canvasMap.style.left=0
canvasMap.style.top=0
canvasMap.style.zIndex=-10
//canvasMap.style.zIndex=-10
//position:absolute;
//  left:0px;
//  top:0px;
//  z-index:-1;
var stillTurnRight = false
var stillTurnLeft = false
var isNight = false // 是否是晚上


var contextTest = canvasTest.getContext("2d");
var scaleNum=canvasTest.width/320 //计算出缩放比例
contextTest.scale(scaleNum,scaleNum) // 设置canvas的缩放比例  原始比例 支持 320px * 240px
var mouseX=0;
var mouseY=0;
// var mouseXHistory=0;
canvasTest.onmousemove = function (e) {
//	console.log('cnGameJs mouse xy:'+cnGame.input.mouseX+'-'+cnGame.input.mouseY)
//	console.log('docunment mouse xy:'+e.pageX+"-"+e.pageY)
//	console.log(e.clientX+"-"+e.clientY)
//	console.log('canvans   left边距：'+canvasTest.getBoundingClientRect().left)
//	console.log('canvans   top边距：'+canvasTest.getBoundingClientRect().top)
//	console.log('cnavans width:'+canvasTest.width)
//	console.log('cnavans height:'+canvasTest.height)
//	console.log('handx:'+playerHand.x)
//	console.log('handy:'+playerHand.y)
	//设置准星
	var starImg = cnGame.loader.loadedImgs[srcObj.star];
//	contextTest.drawImage(starImg, mouseX-canvasTest.getBoundingClientRect().left-starImg.width/2, 
//	mouseY-canvasTest.getBoundingClientRect().top-starImg.height/2, starImg.width, starImg.height);
	
	mouseX=e.clientX
	mouseY=e.clientY
	//设置手臂位置
	var shoubiImg = cnGame.loader.loadedImgs[srcObj.pl];
//	console.log('shoubi width  heght:'+shoubiImg.width+'-'+shoubiImg.height)
	playerHand.x=((mouseX-canvasTest.getBoundingClientRect().left)/scaleNum)
	-(canvasTest.width/3.7)*2/scaleNum
	playerHand.y=((mouseY-canvasTest.getBoundingClientRect().top)/scaleNum)
	-(canvasTest.height/8)*2/scaleNum
//	playerHand.x=((mouseX-canvasTest.getBoundingClientRect().left)/3)
//	-(canvasTest.getBoundingClientRect().left*3)
//	playerHand.y=((mouseY-canvasTest.getBoundingClientRect().top)/3)
//	-(canvasTest.getBoundingClientRect().top*3)
//	console.log('hand canvans 坐标：'+playerHand.x+'-'+playerHand.y)
//	
//	console.log('hand:'+playerHand.x+'-'+playerHand.y)
	// 处理玩家转向
	var zhunxingX=(mouseX-canvasTest.getBoundingClientRect().left)/scaleNum-(starImg.width/2)
	var zhunxingXMax=0
	var zhunxingXMin=0
	zhunxingXMax=zhunxingX>=zhunxingXMax?zhunxingX:zhunxingXMax
	zhunxingXMin=zhunxingX<=zhunxingXMin?zhunxingX:zhunxingXMin
//	console.log('zhunxing max  min:'+zhunxingXMax+'-'+zhunxingXMin)
//	console.log('canvas max x:'+canvasTest.width)
//	console.log('canvas scaleNum:'+scaleNum)
//	console.log('starImg.width/2:'+(starImg.width/2))
	// mouseXHistory = mouseXHistory == 0?mouseX:mouseXHistory
	if(zhunxingX>=( ( (canvasTest.width-(starImg.width*scaleNum))/scaleNum )*69/70 ) ){// 152  to right  
//		playerTemp.angle -= 0.5;
		stillTurnLeft = false
		stillTurnRight = true
	}else if(zhunxingX<=( ( (canvasTest.width-(starImg.width*scaleNum))/scaleNum ))*1/70 ){// -167 to left
//		playerTemp.angle += 0.5;
		stillTurnRight = false
		stillTurnLeft = true
	}else{
		
	}
	
	if (playerTemp.angle < 0) {
            playerTemp.angle += 360;
        }
        else if (playerTemp.angle >= 360) {
            playerTemp.angle %= 360;
        }
	
}
canvasTest.onclick= function(e){
	console.log('shoot click')
	playerTemp.shoot(0, 0);
}

/*	player构造函数	*/
var player = function(options) {
    this.init(options);
    this.FOV = options.FOV || 80; //玩家的视野角度
    this.bodyHeight = 20; //玩家视觉高度
    this.moveSpeed = 1;
    this.life = 10;
    this.protect = 100;
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
    this.hurtLastTime = 0; //上次受伤时间：
    this.hurtDuration = 2; //受伤持续时间:秒
    this.attackDuration = 2; //受攻击持续时间:秒
    this.attackedLastTime = 0; //上次被攻击的时间
    this.lifeRecoverDuration = 30; //30秒内不受伤 生命值就开始恢复
    this.protectZhaoRecoverDuration = 15; //30秒内不被攻击 防护罩会重新恢复 恢复到初始值
    this.lastLifeRecoverTime = 0; //上一次恢复生命值的时间
   

}
cnGame.core.inherit(player, cnGame.Sprite);

/*	player的射击方法	*/
player.prototype.shoot = function(starPos) {
	var list2=colImgsArray;
    this.isShooting = true;
    var enemyRect;
	this.relatedObj.setCurrentAnimation("shoot");//屏幕上的射击动画
	this.relatedObj.index(0);
	
    for (var i = list2.length - 1; i >= 0; i--) {
        if (list2[i] instanceof enemy2 && list2[i].relatedParent.isShooting) {
            var obj = list2[i];
            var enemyRect = obj.getRect();//构造敌人在屏幕上形成的矩形对象
            var starImg = cnGame.loader.loadedImgs[srcObj.star];
            if (cnGame.collision.col_Point_Rect((mouseX-canvasTest.getBoundingClientRect().left)/scaleNum-(starImg.width/2)
            , (mouseY-canvasTest.getBoundingClientRect().top)/scaleNum-(starImg.height/2), enemyRect)) {
            		if(isNight){
            			obj.setCurrentAnimation("enemyDie_night");	
            		}else{
            			obj.setCurrentAnimation("enemyDie");	
            		}
				
                break;
            }
        }
    }

}
/*	player受伤	*/
player.prototype.hurt = function() {
    this.isAttacked = true;
    if(this.protect == 0){ // 如果能量保护罩消失  才开始减生命值
    		this.isHurt = true;
    		layer.msg('防护罩已失效')
    		this.life = Math.max(0, this.life - 1);
    		var now = (new Date()).getTime();
    		this.hurtLastTime = now // 如果生命值减少 记录上一次受伤时间
    		this.attackedLastTime = now //  同时也要记录上一次被攻击时间
    }else{
    		layer.msg('防护罩已启动')
    		this.protect = Math.max(0, this.protect - 1);
    		this.attackedLastTime = (new Date()).getTime(); // 如果防护罩还在只记录 上一次被攻击的时间
    }
    
    

}
/*	player恢复	*/
player.prototype.recover = function() {
    this.isHurt = false;
}
/*	player恢复	*/
player.prototype.recoverProtectZhao = function() {
    this.isAttacked = false;
    console.log('zhao zi  recover')
    layer.msg('防护罩已恢复');
    this.protect = 100;
}
/*	屏幕上的player	*/
var player2=function(options){
    this.init(options);	
	
}
cnGame.core.inherit(player2, cnGame.Sprite);

/*	敌人构造函数	*/
var enemy = function(options) {
    this.init(options);
    this.screenImg = options.screenImg; //在3D屏幕上的图片
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
    this.shootDuration = options.shootDuration; //单位：秒
    this.lastShootTime = 0;
}

cnGame.core.inherit(enemy, cnGame.Sprite);
/*	敌人射击方法	*/
enemy.prototype.shoot = function(player) {
//  var randomNum = Math.floor(Math.random() * 2); //获取随机数
//  if (!randomNum) {//如果随机数是0（1/2机会），则击中玩家
//      player.hurt();
//  }
	player.hurt();

}
/*	敌人更新的同时更新屏幕上的敌人对象	*/
enemy.prototype.update=function(){
	this.parent.prototype.update.call(this);
	this.relatedObj.update();
	
}

/*	屏幕上的敌人的构造函数	*/
var enemy2=function(options){
    this.init(options);	
	
}
cnGame.core.inherit(enemy2, cnGame.Sprite);


/*	钥匙构造函数	*/
var key = function(options) {
    this.init(options);
    this.keyValue = options.keyValue;//钥匙的值
    this.screenImg = options.screenImg; //在3D屏幕上的图片

}
cnGame.core.inherit(key, cnGame.Sprite);

/*	屏幕上的钥匙构造函数	*/
var key2=function(options){
	this.init(options);		
}
cnGame.core.inherit(key2, cnGame.Sprite);


/*  获取屏幕上门或墙的图片  */
var getImgOnScreen = function(map, x, y) {
    var loadedImgs = cnGame.loader.loadedImgs;
    if (map.getPosValue(x, y) == 1) {
        img = loadedImgs[srcObj.wall1]; //墙1的图片
    }
    else if (map.getPosValue(x, y) == 2) {
        img = loadedImgs[srcObj.wall2]; //墙2的图片
    }
    else if (map.getPosValue(x, y) == 3) {
        img = loadedImgs[srcObj.redDoor]; //红门的图片
    }
    else if (map.getPosValue(x, y) == 4) {
        img = loadedImgs[srcObj.greenDoor]; //绿门的图片
    }
    else if (map.getPosValue(x, y) == 5) {
        img = loadedImgs[srcObj.blueDoor]; //蓝门的图片
    }
    return img;
}
/*	player是否碰墙	*/
var isOnWall = function(x, y, width, height, map) {
    return map.getPosValue(x + width / 2, y + height / 2);

}
var colImgsArray = []; //像素线数组

/*	更新每个像素线的信息	*/
var updateColLine = function() {
    var screenX;
    var colAngle;
    var centerX, centerY, beforeX, beforeY, x, y, distant, heightInScreen;
    var colCount = this.screenSize[0] / this.viewColWidth;
	var spriteList = cnGame.spriteList;
	var _player=this.player;
	var screenSize=this.screenSize;
	var screenDistant=this.screenDistant;
	var viewColWidth=this.viewColWidth;
	var map=this.map;
	var wallSize=this.wallSize;
	var playerView=(this.player.FOV/2)*Math.PI/180;//player的左右视野范围
    colImgsArray = [];

    for (var index = 0, colCount = screenSize[0] / viewColWidth; index < colCount; index++) {
        var colliDir;
        var img;
        screenX = -screenSize[0] / 2 + index * viewColWidth; //该竖线在屏幕的x坐标	
        colAngle = Math.atan(screenX / screenDistant); //玩家的视线到屏幕上的竖线所成的角度
        colAngle %= 2 * Math.PI;
        var angle = _player.angle / 180 * (Math.PI) - colAngle; //射线在地图内所成的角度
        angle %= 2 * Math.PI;
        if (angle < 0) {
            angle += 2 * Math.PI;
        }
        distant = 0;
        x = 0;
        y = 0;
        centerX = _player.x + (_player.width) / 2; //玩家中点X坐标
        centerY = _player.y + (_player.height) / 2; //玩家中Y坐标
        while (map.getPosValue(centerX + x, centerY - y) == 0) {
            var nextDistant = distant + 1;

            nextX = nextDistant * Math.cos(angle);
            nextY = nextDistant * Math.sin(angle);
            if (map.getPosValue(centerX + nextX, centerY - y) != 0) {
                colliDir = "x"; //x方向上的相交
            }
            else if (map.getPosValue(centerX + x, centerY - nextY) != 0) {
                colliDir = "y"; //y方向上的相交
            }
            x = nextX;
            y = nextY;
            distant = nextDistant;
        }
        distant *= Math.cos(colAngle); //防止鱼眼效果
        heightInScreen = screenDistant / (distant) * wallSize[2]; //根据玩家到墙壁的距离计算墙壁在视觉平面的高度

        var img = getImgOnScreen(map, centerX + x, centerY - y);

        if (colliDir == "y") {
            var len = ((centerX + x) % wallSize[0]) * (img.width / wallSize[0]);
        }
        else if (colliDir == "x") {
            var len = ((centerY - y) % wallSize[1]) * (img.width / wallSize[1]);
        }
        var newObj = {
            img: img,
            oriX: Math.floor(len),
            oriY: 0,
            oriWidth: img.width / screenSize[0] * viewColWidth,
            oriHeight: img.height,
            x: viewColWidth * index,
            y: (screenSize[1] - heightInScreen) / 2,
            width: viewColWidth,
            height: heightInScreen,
            zIndex: Math.floor(1 / distant * 10000)

        }
        colImgsArray.push(newObj);
    }
	
	/* 敌人和钥匙对象屏幕上的信息更新	*/

    for (var i = 0, len = spriteList.length; i < len; i++) {
        if (spriteList[i] instanceof enemy||spriteList[i] instanceof key) {
            var playerCenter = getCenterXY(_player);
            var enemyCenter = getCenterXY(spriteList[i]);
            var xDistant = enemyCenter[0] - playerCenter[0];
            var yDistant = playerCenter[1] - enemyCenter[1];
            var spriteAngle = Math.atan2(yDistant, xDistant);
			if(spriteAngle>Math.PI){
				spriteAngle=2*Math.PI-spriteAngle;
			}
			else if(spriteAngle<-Math.PI){
				spriteAngle=2*Math.PI+spriteAngle;
				
			}
            var angleToPlayer = (_player.angle * Math.PI / 180) - spriteAngle;//相对于player的角度

            if (angleToPlayer > Math.PI) {//计算夹角，取小的
                angleToPlayer -= 2 * Math.PI;
            }
            else if (angleToPlayer < -Math.PI) {
                angleToPlayer += 2 * Math.PI;
            }
			
            if (angleToPlayer > -playerView && angleToPlayer < playerView) {//在player视野范围内
                var distant = Math.sqrt(xDistant * xDistant + yDistant * yDistant);
                var scale = screenDistant / distant;
                screenX = screenSize[0] / 2 + Math.tan(angleToPlayer) * screenDistant - spriteList[i].width / 2 * scale;
				var img=spriteList[i].image;
				var relatedObj=spriteList[i].relatedObj;
				var relatedShow=relatedObj.image||relatedObj.spriteSheet;
 				
				var frameSizeWidth;
				var frameSizeHeight;
				var heightScale;
				var imgHeight;
				var imgWidth;
                	
				if(relatedObj.spriteSheet){
					scale=(img.width*scale)/relatedShow.frameSize[0];
					relatedShow.scale=scale;
					imgHeight=scale*relatedShow.frameSize[1];
				}
				else if(relatedObj.image){
					heightScale=relatedObj.image.height/relatedObj.image.width;					
               		imgWidth = img.width * scale;
					imgHeight = imgWidth*heightScale;
					relatedObj.width=imgWidth;
					relatedObj.height=imgHeight;
				}
                var screenY = (screenSize[1]) / 2 - imgHeight / 4;
                var zIndex = Math.floor(1 / distant * 10000);
                spriteList[i].zIndex = zIndex;
				relatedObj.x= screenX;
				relatedObj.y= screenY;
				relatedObj.zIndex=zIndex;	
				relatedObj.imgWidth=relatedShow.width;
				relatedObj.imgHeight=relatedShow.height;				
				colImgsArray.push(relatedObj);
            }
        }

    }


}
/*  检测是否获得钥匙    */
var checkGetKeys = function() {
    var list = cnGame.spriteList;
	var playerRect= this.player.getRect();
    for (var i = 0, len = list.length; i < len; i++) {
        if (list[i] instanceof key) {
            if (cnGame.collision.col_Between_Rects(list[i].getRect(),playerRect)) {
                this.keysValue.push(list[i].keyValue);
                list.remove(list[i]);
                i--;
                len--;
            }
        }
    }

}
/*  返回在哪扇门前   */
var BeforeDoor = function() {
    var rect = this.player.getRect();
    var map = this.map;
    var doorsArr = this.doorsArr;
    for (var i = 0, len = doorsArr.length; i < len; i++) {
        if (map.getPosValue(rect.leftTop[0], rect.leftTop[1]) == doorsArr[i].value || map.getPosValue(rect.rightTop[0], rect.rightTop[1]) == doorsArr[i].value || map.getPosValue(rect.leftBottom[0], rect.leftBottom[1]) == doorsArr[i].value || map.getPosValue(rect.rightBottom[0], rect.rightBottom[1]) == doorsArr[i].value) {
            return doorsArr[i];
        }
    }

}


/*  门对象的构造函数    */
var door = function(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;

}
/*  打开门  */
var openDoor = function(door, map) {
    var index = map.getCurrentIndex(door.x, door.y);
    map.setIndexValue(index,0);
}
/*  获取对象的中点坐标  */
var getCenterXY=function(elem){
    return [elem.x+elem.width/2,elem.y+elem.height/2];
}

/*  根据玩家位置改变敌人的角度  */
var changeEnemyAngle = function(duration) {
    var spriteList = cnGame.spriteList;
    var player = this.player;
    var playerCenter = getCenterXY(player);
    var playerRect = this.player.getRect();
    var distant;
    var x;
    var y;
    var nextX;
    var nextY;

    for (var i = 0, len = spriteList.length; i < len; i++) {
        if (spriteList[i] instanceof enemy) {
        		// 判断如果是晚上  改用夜晚皮肤
        		if(isNight){
//      			console.log('启用敌人夜晚站立皮肤')
        			spriteList[i].relatedObj.src = srcObj.enemy_night
        		}
        		
        		
            distant = 0;
            var enemyCenter = getCenterXY(spriteList[i]);
            var distantX = playerCenter[0] - enemyCenter[0];
            var distantY = enemyCenter[1] - playerCenter[1];
            var detect = false;

            var angle = Math.atan2(distantY, distantX);

            if (angle < 0) {
                angle += 2 * Math.PI;
            }
            else if (angle > 2 * Math.PI) {
                angle -= 2 * Math.PI;
            }

            spriteList[i].angle = angle * 180 / Math.PI;
            nextX = enemyCenter[0];
            nextY = enemyCenter[1];
            while (this.map.getPosValue(nextX, nextY) == 0) {
                distant += 1;
                x = nextX;
                y = nextY;
                if (cnGame.collision.col_Point_Rect(x, y, playerRect)&&!spriteList[i].relatedObj.isCurrentAnimation("enemyDie")&&!isNight || 
                cnGame.collision.col_Point_Rect(x, y, playerRect)&&!spriteList[i].relatedObj.isCurrentAnimation("enemyDie_night")&&isNight) {//如果地图上敌人能看到玩家，则向玩家射击
                    spriteList[i].isShooting = true;
                    if (spriteList[i].lastShootTime > spriteList[i].shootDuration) {//检查是否超过射击时间间隔，超过则射击玩家            
                        spriteList[i].shoot(player);
                        if(isNight){
                        		spriteList[i].relatedObj.setCurrentImage(srcObj.enemy1_night);	
                        } else {
                        		spriteList[i].relatedObj.setCurrentImage(srcObj.enemy1);		
                        }
                        spriteList[i].lastShootTime = 0;

                    }
                    else {
                        if (spriteList[i].lastShootTime > 0.1) {
                            if(isNight){
                        			spriteList[i].relatedObj.setCurrentImage(srcObj.enemy1_night);	
	                        } else {
	                        		spriteList[i].relatedObj.setCurrentImage(srcObj.enemy1);		
	                        }				
                        }
                        spriteList[i].lastShootTime += duration;
                    }
                    break;
                }
                else {
                    spriteList[i].isShooting = false;
                }
                nextX = distant * Math.cos(angle) + enemyCenter[0];
                nextY = enemyCenter[1] - distant * Math.sin(angle);
            }

        }
    }
}
/*	画出血条信息	*/
var	drawLife=function(){	
	this.lifeText.draw();
	var lifeImg=cnGame.loader.loadedImgs[srcObj.life];
	// context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
	this.screenContext.drawImage(lifeImg,0,0,100,15,60,4,this.player.life*10,15);
}
/*	画出获得的钥匙信息	*/
var drawKeys=function(){
	this.keyText.draw();
	var keyImg;
	var startX=240;
	var keysArr=this.keysValue;
	for(var i=0,len=keysArr.length;i<len;i++){
		if(keysArr[i]==3){
			keyImg=cnGame.loader.loadedImgs[srcObj.redKey1];			
		}
		else if(keysArr[i]==4){
			keyImg=cnGame.loader.loadedImgs[srcObj.greenKey1];	
		}
		else if(keysArr[i]==5){
			keyImg=cnGame.loader.loadedImgs[srcObj.blueKey1];	
		}
		this.screenContext.drawImage(keyImg,startX,2,20,20);
		startX+=25;
	}
	
}
/*	添加敌人	*/
var addEnemy=function(enemyX,enemyY,shootDuration,screenContext){
	    var newEnemy ;
		
		if(isNight){
			newEnemy = new enemy({ src: srcObj.enemy0, width: 10, height: 10, angle: 0, x: enemyX, y: enemyY, screenImg: cnGame.loader.loadedImgs[srcObj.enemy_night], shootDuration: shootDuration });
			newEnemy.relatedObj=new enemy2({src:srcObj.enemy_night,context:screenContext});
		}else{
			newEnemy = new enemy({ src: srcObj.enemy0, width: 10, height: 10, angle: 0, x: enemyX, y: enemyY, screenImg: cnGame.loader.loadedImgs[srcObj.enemy], shootDuration: shootDuration });
			newEnemy.relatedObj=new enemy2({src:srcObj.enemy,context:screenContext});
		}
		newEnemy.relatedObj.relatedParent=newEnemy;
		newEnemy.relatedObj.addAnimation(new cnGame.SpriteSheet("enemyDie",srcObj.enemy10,{frameDuration:100,width:1140,height:550,frameSize:[190,550],context:screenContext,onFinish:function(){cnGame.spriteList.remove(this.relatedSprite.relatedParent);}}));
        newEnemy.relatedObj.addAnimation(new cnGame.SpriteSheet("enemyDie_night",srcObj.enemy10_night,{frameDuration:100,width:1140,height:550,frameSize:[190,550],context:screenContext,onFinish:function(){cnGame.spriteList.remove(this.relatedSprite.relatedParent);}}));
        
        cnGame.spriteList.add(newEnemy);
	
}
var playerTemp=null;
var playerHand=null;
/*	游戏对象	*/
var gameObj = {
    screenSize: [320, 240], //视觉屏幕尺寸
    viewColWidth: 0.5, //每条绘制线条的宽
    wallSize: [20, 20, 30], //墙的尺寸
    keysValue: [], //钥匙的值 3：红 4：绿 5：蓝
    doorsArr: [],//门数组
    gameStartTime:(new Date()).getTime(),//游戏开始的时间
    dayDuration:60, //一天的周期  ：秒
    initialize: function() {

        cnGame.input.preventDefault(["tab","left", "up", "down", "right", "shift", "space","w","s","a","d"]);

        this.player = new player({ src: srcObj.player, width: 10, height: 10, angle: 90, x: 20, y: 360 });
		playerTemp=this.player
		this.screenCanvas = cnGame.core.$("screenCanvas"); //用于显示3d空间的canvas
        this.screenContext = this.screenCanvas.getContext("2d"); //3d空间的canvas的context
		this.player.relatedObj=new player2({src:srcObj.pl,x:0,y:55,width:320,height:185,imgWidth:320,imgHeight:185,context:this.screenContext});
		// 0 55  160  120
		playerHand=this.player.relatedObj
		this.player.relatedObj.addAnimation(new cnGame.SpriteSheet("shoot",srcObj.pl,{width:3520,height:185,frameSize:[320,185],context:this.screenContext}));

        cnGame.spriteList.add(this.player);
		cnGame.spriteList.add(this.player.relatedObj);
		
        this.screenDistant = (this.screenSize[0] / 2) / (Math.tan(this.player.FOV / 2 * Math.PI / 180)); //屏幕离玩家的距离
        this.enemyMoveDuration = 2;
        this.enemyLastMove = 0;

        this.map = new cnGame.Map(mapMatrix, { cellSize: [20, 20], width: cnGame.width, height: cnGame.height });

        var redKey = new key({ src: srcObj.redKey0, x: 25, y: 225, width: 5, height: 5, screenImg: cnGame.loader.loadedImgs[srcObj.redKey], keyValue: 3 });
		redKey.relatedObj=new key2({src:srcObj.redKey,context:this.screenContext});
        cnGame.spriteList.add(redKey);
		
        var greenKey = new key({ src: srcObj.greenKey0, x: 25, y: 65, width: 5, height: 5, screenImg: cnGame.loader.loadedImgs[srcObj.greenKey], keyValue: 4 });
		greenKey.relatedObj=new key2({src:srcObj.greenKey,context:this.screenContext});
        cnGame.spriteList.add(greenKey);
        var blueKey = new key({ src: srcObj.blueKey0, x: 270, y: 30, width: 5, height: 5, screenImg: cnGame.loader.loadedImgs[srcObj.blueKey], keyValue: 5 });
		blueKey.relatedObj=new key2({src:srcObj.blueKey,context:this.screenContext});
        cnGame.spriteList.add(blueKey);

        var cellSize = this.map.cellSize;
        var redDoor = new door(7 * cellSize[0], 7 * cellSize[1], 3);
        this.doorsArr.push(redDoor);
        var greenDoor = new door(12 * cellSize[0], 10 * cellSize[1], 4);
        this.doorsArr.push(greenDoor);
        var blueDoor = new door(16 * cellSize[0], 8 * cellSize[1], 5);
        this.doorsArr.push(blueDoor);
		
		/*	在不同地方添加敌人	*/
		addEnemy(60,165,1,this.screenContext);
		addEnemy(100,165,2,this.screenContext);
		addEnemy(150,105,1,this.screenContext);
		addEnemy(50,120,1.5,this.screenContext);
		addEnemy(25,40,0.5,this.screenContext);
		addEnemy(240,90,1,this.screenContext);
		addEnemy(95,285,0.5,this.screenContext);
		addEnemy(160,365,1.5,this.screenContext);
		addEnemy(210,170,2,this.screenContext);
		addEnemy(225,205,0.5,this.screenContext);
		addEnemy(175,25,1.5,this.screenContext);
		addEnemy(265,190,0.5,this.screenContext);
		addEnemy(285,110,0.5,this.screenContext);
		addEnemy(265,205,1,this.screenContext);
		addEnemy(265,295,1,this.screenContext);
		addEnemy(325,295,1.5,this.screenContext);

		/*	生命条和钥匙文本	*/
		this.lifeText=cnGame.shape.Text("生命值：",{x:10,y:14,style:"#000",font:"10px sans-serif",context:this.screenContext});
		this.keyText=cnGame.shape.Text("获得钥匙：",{x:180,y:14,style:"#000",font:"10px sans-serif",context:this.screenContext});
    },
    update: function(duration) {
		if(this.player.life<=0){
			cnGame.loop.end();
			alert("you lost!");	
			return;
		}
		if(this.map.getPosValue(this.player.x,this.player.y)=="9"){
			cnGame.loop.end();
			alert("you win!");	
			return;		
		}
		if(stillTurnRight){
			playerTemp.angle -= 1;
			setTimeout("stillTurnRight = false",1000)
			//stillTurnRight = false
		}
		if(stillTurnLeft){
			playerTemp.angle += 1;
			setTimeout("stillTurnLeft = false",1000)
			//stillTurnLeft = false
		}
        var now = (new Date()).getTime();
        var input = cnGame.input;
        if (input.isPressed("left")||input.isPressed("a")) {//向左转
//          this.player.angle += 5;
			var nextX = this.player.x - Math.sin(this.player.angle * Math.PI / 180) * this.player.moveSpeed/2;
			var nextY = this.player.y - Math.cos(this.player.angle * Math.PI / 180) * this.player.moveSpeed/2;
            if (!isOnWall(nextX, nextY, this.player.width, this.player.height, this.map)) {
                this.player.x = nextX;
                this.player.y = nextY;
            }
        }
        else if (input.isPressed("right")||input.isPressed("d")) {//向右转
//          this.player.angle -= 5;
			var nextX = this.player.x + Math.sin(this.player.angle * Math.PI / 180) * this.player.moveSpeed;
			var nextY = this.player.y + Math.cos(this.player.angle * Math.PI / 180) * this.player.moveSpeed
            if (!isOnWall(nextX, nextY, this.player.width, this.player.height, this.map)) {
                this.player.x = nextX;
                this.player.y = nextY;
            }
        }
        if (this.player.angle < 0) {
            this.player.angle += 360;
        }
        else if (this.player.angle >= 360) {
            this.player.angle %= 360;
        }
        if (input.isPressed("up")||input.isPressed("w")) {//前进
            var nextX = this.player.x + Math.cos(this.player.angle * Math.PI / 180) * this.player.moveSpeed;
            var nextY = this.player.y - Math.sin(this.player.angle * Math.PI / 180) * this.player.moveSpeed;
            if (!isOnWall(nextX, nextY, this.player.width, this.player.height, this.map)) {
                this.player.x = nextX;
                this.player.y = nextY;
            }

        }
        else if (input.isPressed("down")||input.isPressed("s")) {//后退
            var nextX = this.player.x - Math.cos(this.player.angle * Math.PI / 180) * this.player.moveSpeed;
            var nextY = this.player.y + Math.sin(this.player.angle * Math.PI / 180) * this.player.moveSpeed;
            if (!isOnWall(nextX, nextY, this.player.width, this.player.height, this.map)) {
                this.player.x = nextX;
                this.player.y = nextY;
            }
        }
        var door;
        if (input.isPressed("e")) {//开门
            door = BeforeDoor.call(this);
            if (door) {
                for (var i = 0, len = this.keysValue.length; i < len; i++) {
                    if (this.keysValue[i] == door.value) {
                        openDoor(door, this.map);
                        break;
                    }
                }
            }
        }
        
        if (input.isPressed("tab")) {//显示小地图
//      		console.log('map zindex:'+canvasMap.style.zIndex)
			if(canvasMap.style.zIndex==-10){
				canvasMap.style.zIndex=1000
			}
			else if(canvasMap.style.zIndex==1000){
				canvasMap.style.zIndex=-10
			}
        }
   
        if (input.isPressed("space")) {
            if (!this.player.isShooting) {
//          	console.log(thatWindow.nextX)
//				console.log(getMousePos(this.Window.Event))
            		console.log((this.screenSize[0] / 2)+"---"+(this.screenSize[1] / 2));
                this.player.shoot([this.screenSize[0] / 2, this.screenSize[1] / 2]);
            }
        }
        else {
            this.player.isShooting = false;
        }
		
        changeEnemyAngle.call(this, duration);
        updateColLine.call(this);
        checkGetKeys.call(this);
		
		// 判断是否还处于受伤状态
        if (this.player.isHurt && (now - this.player.hurtLastTime) / 1000 > this.player.hurtDuration ) {//player受伤状态的恢复
//          console.log('1231')
            this.player.recover();
        }
        // 判断是否需要恢复生命值
        if( (now - this.player.hurtLastTime) / 1000 > this.player.lifeRecoverDuration ){
//          	console.log('aaaaa')
            		var lastLifeRecoverTime = this.player.lastLifeRecoverTime == 0?this.player.hurtLastTime : this.player.lastLifeRecoverTime
            		var num1 = (now - lastLifeRecoverTime) / 1000
            		var num2 = parseInt(num1 / this.player.lifeRecoverDuration)
            			if(num2 > 0){
            				this.player.life += num2
            				this.player.life = this.player.life >= 10 ? 10 : this.player.life
            				console.log('sheng ming zhi +'+num2)
            				console.log('当前生命值：'+this.player.life)
            				this.player.lastLifeRecoverTime = now
            			}
            }
        // 判定是否还在被攻击
        if(this.player.isAttacked && (now - this.player.attackedLastTime) / 1000 > this.player.attackDuration ){
			this.player.isAttacked = false
        }
        
        // 判断防护罩是否需要恢复
        if((this.player.attackedLastTime != 0 )&& (now - this.player.attackedLastTime) / 1000 > this.player.protectZhaoRecoverDuration ){
        		this.player.recoverProtectZhao()
        		this.player.attackedLastTime = now
        }

        colImgsArray.sort(function(obj1, obj2) {

            if (obj1.zIndex > obj2.zIndex) {
                return 1;
            }
            else if (obj1.zIndex < obj2.zIndex) {
                return -1;
            }
            else {
                return 0;
            }
        });
    },
    draw: function(duration) {
    		
    		var timeGameLast = ((new Date()).getTime() - this.gameStartTime) / 1000 // 游戏已经持续了多久：秒
//  		console.log('timeGameLast:'+timeGameLast)
    		if( parseInt(timeGameLast / this.dayDuration) % 2 == 0){
//  			console.log('parseInt(timeGameLast / this.dayDuration) % 2='+(parseInt(timeGameLast / this.dayDuration) % 2))
    			isNight = true
    		}else{
    			isNight = false
    		}
		//画出地图
        this.map.draw({ "0": { src: srcObj.ground }, "1": { src: srcObj.wall1 }, "2": { src: srcObj.wall2 }, "3": { src: srcObj.redDoor }, "4": { src: srcObj.greenDoor }, "5": { src: srcObj.blueDoor},"9":{ src: srcObj.destination}});
		//画出天和地
        var context = this.screenContext;
        context.clearRect(0, 0, this.screenSize[0], this.screenSize[1]);
//      context.fillStyle = "rgb(203,242,238)";
		context.fillStyle = isNight?"rgb(0,0,0)":"rgb(203,242,238)"
        context.fillRect(0, 0, this.screenSize[0], this.screenSize[1] / 2);
        context.fillStyle = "rgb(77,88,87)";
        context.fillRect(0, this.screenSize[1] / 2, this.screenSize[0], this.screenSize[1] / 2);
		//画出每条像素线和游戏元素
        for (var i = 0, len = colImgsArray.length; i < len; i++) {
            var obj = colImgsArray[i];
			if(obj.draw){
				obj.draw();
			}
			else{
            	context.drawImage(obj.img, obj.oriX, obj.oriY, obj.oriWidth, obj.oriHeight, obj.x, obj.y, obj.width, obj.height);
			}
        }	
		//画出准星
		var starImg;
		if(isNight){
				starImg = cnGame.loader.loadedImgs[srcObj.star_night];
			}else{
				starImg = cnGame.loader.loadedImgs[srcObj.star];
			}
        
		context.drawImage(starImg, (mouseX-canvasTest.getBoundingClientRect().left)/scaleNum-(starImg.width/2), 
		(mouseY-canvasTest.getBoundingClientRect().top)/scaleNum-(starImg.height/2), starImg.width, starImg.height);
		//被攻击时的时候画出红屏 或者防护罩
        if (this.player.isHurt && this.player.protect == 0) {
            context.drawImage(cnGame.loader.loadedImgs[srcObj.hurt], 0, 0, this.screenSize[0], this.screenSize[1]);
        }else if(this.player.isAttacked && this.player.protect > 0){
//      		console.log(' show zhao zi')
			if(isNight){
				console.log('open the night protect device')
				context.drawImage(cnGame.loader.loadedImgs[srcObj.protectZhao_night], 0, 0, this.screenSize[0], this.screenSize[1]);
			}else{
				console.log('open the day protect device')
				context.drawImage(cnGame.loader.loadedImgs[srcObj.protectZhao], 0, 0, this.screenSize[0], this.screenSize[1]);
			}
        }else{
        	
        }
        // 模拟黑夜场景
        if(isNight){
        	        context.drawImage(cnGame.loader.loadedImgs[srcObj.night], 0, 0, this.screenSize[0], this.screenSize[1]);
        }else{
        	
        }
        
		//画出血条信息
		drawLife.call(this);
		//画出钥匙信息
		drawKeys.call(this);

    }
};
cnGame.loader.start(gameObj, { srcArray: srcObj });