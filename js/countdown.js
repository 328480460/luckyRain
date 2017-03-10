function Countdown(){
	this.pTimer = 0;  //总时间
	this.day = 0;    //剩余X天
	this.hour = 0;	//剩余X小时
	this.min = 0;	//剩余X分钟
	this.sec = 0;	//剩余X秒
	this.Timer = null;	//倒计时定时器
}

Countdown.prototype.conversion = function(){		 //倒计时-换算方法
	this.day = parseInt( this.pTimer/(24*3600) );
	this.hour = parseInt( this.pTimer%(24*3600)/3600 );
	this.min = parseInt( ( this.pTimer%(24*3600) )%3600/60 );
	this.sec = parseInt( ( ( this.pTimer%(24*3600) )%3600 )%60 );
	this.render();
};

Countdown.prototype.zerFill = function(num){			//倒计时-补零方法
	var _num = num < 10 ? "0" + num : num;
	return _num;		 
};

Countdown.prototype.timerRun = function(){ 	//倒计时-运行方法
	var _this = this;
	this.Timer = setInterval(function(){
		if(_this.pTimer === 0){
			clearInterval( _this.Timer );
			_this.config.endCb&&_this.config.endCb();
		}else{
			_this.pTimer--;
			_this.conversion();
		}
	},1000);
};

Countdown.prototype.render = function(){		//倒计时-渲染方法
	this.day = this.zerFill( this.day );
	this.hour = this.zerFill( this.hour );
	this.min = this.zerFill( this.min );
	this.sec = this.zerFill( this.sec );
	this.config.renderCb&&this.config.renderCb();
};

Countdown.prototype.init = function(pTimer,config){ 	//倒计时-初始化
	this.pTimer = pTimer;
	this.config = config;
	this.timerRun();
	this.conversion();			
};



// -------------------------------倒计时 end------------------------------------------------
