




function loadScript(url, callback){

    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

 
    loadScript("common/js/jquery.appear.js", function(){




        loadScript("common/js/jquery.lettering.js", function(){


            loadScript("common/js/jquery.textillate.js", function(){


                
                
                

                $(document).on('appear', '.textanimated', function(e, $affected) {
                    // console.log($(this).attr('animation'));
                    // $(this).addClass( $(this).attr('animation'));

                    var el = $(e.target);



                    if(el.attr('data-in-effect') != undefined){

                        if(el.attr('atype') == undefined){
                            el.textillate();


                        }else{



                            eval("el.textillate({ in: { effect: '"+el.attr('data-in-effect')+
                                "', "+el.attr('atype')+":true} }); el.textillate('start'); ") ;



                        }


                        el.removeAttr('data-in-effect');



                    }





                });
                $('.textanimated').appear();


                $.force_appear();



            });


        });





        $(document).on('appear', '.animated', function(e, $affected) {
        // console.log($(this).attr('animation'));
        // $(this).addClass( $(this).attr('animation'));


        var el = $(e.target);

        if( el.attr('animation') != undefined){




            el.addClass(el.attr('animation'));
            el.removeAttr('animation');


        }
    });
    $('.animated').appear();



    $.force_appear();

});

 

function guid() {

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return (s4() + s4() + '' + s4() + '' + s4() + '' +
    s4() + '' + s4() + s4() + s4() + s4() + '' + s4() + '' + s4() + '' +
    s4() + '' + s4() + s4() + s4()+ '' + s4() + s4() + s4()+ '' + s4() + s4() + s4()).replace(/[0-9]/g, '');/**/


}








var videofones = $('div.blockvid[vidsrc]');

if(videofones.length > 0){

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function() {
        videofones.each(function (i) {


            // $(this).tubular($('#'+$(this).attr('id')),{videoId: "oi54JmQ--Iw", start: 1});



            var vidid = $(this).attr('vidsrc');


            if(vidid  != undefined && vidid != ''){

                var options =     {
                    ratio: 16/9, // usually either 4/3 or 16/9 -- tweak as needed
                    videoId: vidid, // toy robot in space is a good default, no?
                    mute: true,
                    repeat: true,
                    width: $(window).width(),
                    wrapperZIndex: 99,
                    playButtonClass: 'tubular-play',
                    pauseButtonClass: 'tubular-pause',
                    muteButtonClass: 'tubular-mute',
                    volumeUpClass: 'tubular-volume-up',
                    volumeDownClass: 'tubular-volume-down',
                    increaseVolumeBy: 10,
                    start: 0
                };


                $node = $(this);//$(node); // cache wrapper node

                // build container
                var tubularContainer = '<div class="tubular-container" style="overflow: hidden; position: absolute; z-index: 1; width: 100%; height: 100%"><div id="' + guid() + '" class="tubular-player" style="position: absolute"></div></div><div class="tubular-shield" style="width: 100%; height: 100%; z-index: 2; position: absolute; left: 0; top: 0;"></div>';

                var x = $node.find('.videovrapper').first();

                x.html(tubularContainer);


                var player = new YT.Player(x.find('.tubular-player').first().attr('id'), {
                    width: options.width,
                    height: Math.ceil(options.width / options.ratio),
                    videoId: options.videoId,
                    playerVars: {
                        controls: 0,
                        showinfo: 0,
                        modestbranding: 1,
                        wmode: 'transparent',
                        autoplay: 1,
                        loop: 1
                    }
                    ,events: {
                        /*  'onReady': function (e) {
                         if (options.mute) e.target.mute();
                         e.target.seekTo(options.start);
                         e.target.playVideo();
                         },*/
                        'onStateChange' : function(e,state) {
                            if(e.target.getPlayerState() ==0) {

                                e.target.seekTo(0); // restart
                                e.target.playVideo();
                            }  if(e.target.getPlayerState() == 1) {

                                e.target.mute();
                                

                            }
                        }

                    }
                });

            }



        });
    }



}













var maps = $('div[widgettype=MAPBLOCK]');

if(maps.length > 0){


    loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU", function(){



        ymaps.ready(function () {

            maps.each(function (i) {


               var points = $(this).attr('points');
                if( points!= undefined && points != ''){


                    points = points.split(' ');




                    var center = $(this).attr('center');

                    var c = [];
                    c[0] = parseFloat(points[1]);
                    c[1] = parseFloat(points[0]);
                    if(center != undefined && center != ''){


                        var x = center.split(' ');
                        c[0] = parseFloat(x[0]);
                        c[1] = parseFloat(x[1]);
                    }

                    var zoom = 16;

                    var zm = $(this).attr('zoom');
                    if(zm != undefined && zm != ''){

                        zoom = zm;

                    }
                    var map =  new   ymaps.Map(''+$(this).attr('id'), {

                        center: [ c[0],  c[1]],
                        zoom: zoom,
                        controls: []
                    }, {
                        searchControlProvider: ''
                    });


                    map.controls.add(
                        new ymaps.control.ZoomControl()
                    );

                    map.geoObjects.add( new ymaps.Placemark([parseFloat(points[1]) , parseFloat(points[0])]));



                }


            })
        });

        $(window).resize(function () {$('.ymaps-2-1-50-map').css({width: '100%', height: '100%'});});

    });


}


 

function formValidate(input, issub) {

    var valid = true;

    var val = input.val();
    if(input.attr('rq') == 'true'){


        var type = input.attr('ftype');


        if(type == 'text' || type == ''|| type == undefined){
            if(val == ''){

                valid = false;
            }
        }

        if(type == 'email'){
            var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
            if(!pattern.test(val)){
                valid = false;
            }
        }

        if(type == 'phone'){
            //.indexOf('_') != -1


            var i =val.length-val.replace(/\d/gm,'').length;
            if(val == '' || i < 10 || i > 14
                || val.length > 20 || (val.length - i) > 6){

                valid = false;
            }
        }




    }else{
        return valid;
    }

    //box-shadow: rgb(255, 0, 0) 0px 0px 11px 2px inset;
    if(valid == false){

        if(issub)
        input.css('box-shadow', 'rgb(255, 0, 0) 0px 0px 11px 2px inset');
    }else{
        input.css('box-shadow','');
    }

    return valid;

}



$('input,textarea').blur(function () {

    formValidate($(this), false);
});




function SendYandexGoogle(form) {
    if (metrica != null && mGoal != '' && mGoal != null && useYandexCommon == true) {
        eval("yaCounter" + metrica + ".reachGoal('" + mGoal + "'); ");

    } else {
        if (form.attr('mgoal') != '' && form.attr('mgoal') != undefined && metrica != null) {
            eval("yaCounter" + metrica + ".reachGoal('" + form.attr('mgoal') + "'); ");
        }
    }

    if(analyics != null && gCat != '' && gCat != null && gGoal != '' && gGoal != null
        && useGoogleCommon == true){

        eval("ga('send','" + gCat + "','" + gGoal + "');");

    }else{
        if (form.attr('ggoal') != '' && form.attr('ggoal') != undefined && analyics != null) {
            if (form.attr('gcat') != '' && form.attr('gcat')) {
                eval("ga('send','" + form.attr('gcat') + "','" + form.attr('ggoal') + "');");
            }
        }
    }
}



$('.ls-button').click(function () {


    SendYandexGoogle($(this).children('div').first());




});


$('.ls-link').click(function () {

    SendYandexGoogle($(this).children('a').first());




});


$('div[issubmitbutton=true]').click(function () {

    var form = $(this).closest('form');






    var inputs = form.find('input,textarea');
    var d = '';
    var data = form.attr('data');

    var valid = true;

    inputs.each(function () {



        var val = $(this).val();

        var v = formValidate($(this), true);
        if(v != valid && valid == true){
            valid = v;
        }

        d = d + '<p><b>'+$(this).attr('lbl').replace('*','')+': </b>'+val+'</p>';

    });


    if(valid == false){
        return;
    }


    // url: 'http://srv.likesite.net/index.php?r=common%2Fformsubmit',
    $.ajax({
        type: "POST",
        url: 'http://likesite.tech/index.php?r=common%2Fformsubmit',
        cache: false,

        data: {
            'data' : data,
            'msg' : d

        },

        success: function(r) {


            SendYandexGoogle(form);

            if(r == 'ok'){
            form.find('input,textarea').val('');
           // alert('Форма успешно отправлена');


                var message = form.attr('SuccessMessage');



                if(message == undefined || message == ''){
                    message = 'Спасибо за обращение в ближайшее время мы свяжемся с вами.';
                }


                form.css('overflow','hidden');
                form.append('<div class="FormSuccessMessage"><div><p>'+message+'</p></div></div>');



                setTimeout( function() {
                   var fsm = form.find('.FormSuccessMessage').remove();
                    form.css('overflow','');
                    fsm.remove();

                }, 7000 );


            }else{


                alert('Произошла ошибка');
            }


        },   error: function(r){


            alert('Произошла ошибка');

        }

    });

 /**/




});


$('.popupButton').click(function () {

    var id = $(this).find('*[linkvalue]').attr('linkvalue');

    openFancyPopup(id);


});
function openFancyPopup(id) {
    if(id != '' && id != 'none' && id != undefined){
        $(id).css('position','initial');
        $.fancybox({

            'content' : $(id),
            'autoDimensions'	: false,
            'width'         		: $(id).width(),
            'padding' :   '0px',
            'height'        		: $(id).height(),
            'transitionIn'		: 'none',
            'transitionOut'		: 'none'
        });

    }
}



var canOpenPanel = true;

function OpenTreeMenu(){
    var panel = $('#pagesTreePanel');
    if(panel.hasClass('hidden') == false){
        //CloseWidgetMenu();
        return;
    }



    if(canOpenPanel){
    panel.css('left','-250px');

    panel.removeClass('hidden');
    panel.animate({left: '0px'}, 300);
}
}

function CloseTreeMenu(){

    var panel = $('#pagesTreePanel');
    if(panel.hasClass('hidden') == true){
        //CloseWidgetMenu();
        return;
    }


    //panel.css('left','0px');
    panel.css('z-index','99999999');

    panel.animate({left: '-250px'}, 300, function(){

        panel.addClass('hidden');

    });


}




    if(pagesData != undefined){



        $('#pagesTreePanel').on('mouseleave',function (e) {


            CloseTreeMenu();

        });


        var treeSettings = {
            view: {
                dblClickExpand: false,
                showLine: true,
                showIcon: true,
                selectedMulti: false
            },
            edit: {
                enable: false,
                showRemoveBtn: true,
                showRenameBtn: false
            },
            data: {
                simpleData: {
                    enable: true
                }
            },

            callback: {

                onClick: function (e,x, node) {

                    e.stopPropagation();


                    if(node.isIndex){
                        window.location = 'index.html';
                    }else{
                        window.location = node.alias + '.html';
                    }


                },

            }

        };


        var PagesTree = $.fn.zTree.init($("#pagesTreeList"),treeSettings, pagesData);

        PagesTree.expandAll(true);








        $(document).mousemove(function (e) {



            if (e.pageX < 10) {
                var panel = $('#pagesTreePanel');
                if (panel.hasClass('hidden') == true) {

                    OpenTreeMenu();
                }

            }

        });




        }


    $('.ui-element.EskWidgetMenu').each(function () {


        $(this).bind($(this).attr('openevent'), function () {


           // $(this).closest('section').css('z-index','77778');
           /* $(this).parents().not('body,html').not('[sectionfixed]').css('z-index','77778');
            if($(this).parents('.ui-element.EskWidgetMenu').length == 0) {
                $(this).css('z-index', '77778');
            } */
            $(this).closest('section').not('[sectionfixed]').css('z-index','77778');
            $(this).children('.EskWidgetContainer').removeClass('hidden');

        });


        $(this).bind('mouseleave', function (e) {




             
            $(this).find('.ui-element.EskWidgetContainer').addClass('hidden');
          //  $(this).closest('section').css('z-index','');

          /*  if($(this).parents('.ui-element.EskWidgetMenu').length == 0){
            $(this).parents().not('[sectionfixed]').css('z-index','');



            }*/
            $(this).closest('section').not('[sectionfixed]').css('z-index', '');
           // $(this).css('z-index','');

        });

    });

    $('[panelactivator]').each(function () {

       $(this).bind($(this).attr('event'), function () {
       // $(this).bind('mouseenter', function () {



          if (  $(this).find('.ispopup').length == 0){
            var clone = $('#'+$(this).attr('panel')).clone(true);



              var height = $('#'+$(this).attr('panel')).height();
              var width = $('#'+$(this).attr('panel')).width();




              if($(this).attr('xOffset') != undefined && $(this).attr('yOffset') != undefined) {
                  clone.css({
                      top: $(this).attr('yOffset'),
                      left: $(this).attr('xOffset')
                  });

              }else {


                  var pos = $(this).attr('panelpos');
                  if (pos == undefined || pos == 'bottom') {
                      clone.css({
                          top: $(this).height() + 'px',
                          left: '0px'
                      });
                  }
                  if (pos == 'right') {
                      clone.css({
                          left: $(this).width() + 'px',
                          top: '0px'
                      });
                  }
                  if (pos == 'left') {
                      clone.css({
                          left: (0 - width  ) + 'px',
                          top: '0px'
                      });
                  }
                  if (pos == 'center') {
                      clone.css({
                          top: ((((height / 2) * -1) + ($(this).height()) / 2) ) + 'px',
                          left: ((((width / 2) * -1) + ($(this).width()) / 2) ) + 'px'
                      });
                  }


                  if (pos == 'top') {
                      clone.css({
                          top: (height * -1) + 'px',
                          left: '0px'
                      });
                  }


              }

              clone.addClass('floatingnow');
              clone.css('z-index', '77778');


            $(this).append(clone);


              $(this).closest('section').css('z-index','77778');
              $(this).parents().css('z-index','77778');

              $(this).css('z-index','77778');
          }

        });

        $(this).bind('mouseleave', function () {



            $(this).find('.floatingnow').remove();
            $(this).closest('section').css('z-index','');
            $(this).parents().css('z-index','');
            $(this).css('z-index','');

        });



    });



$(document).on('click', '.tabsItem', function () {

  

    var ui = $(this).closest('.ui-element');

    ui.find('.tabsItem').removeClass('ActiveItem');
    $(this).addClass('ActiveItem');
    ui.find('.tabsContent').addClass('hidden');

    ui.find('.tabsContent[tabdata="'+$(this).attr('tabdata')+'"]').removeClass('hidden');



});


$('i[widgettype=NOTE]').each(function () {

    if($(this).attr('title') != undefined) {
    $(this).attr('title', $(this).attr('title').replace(/\n/g, '<br/>') );
    }

    if($(this).attr('links') != undefined) {


        var links = JSON.parse($(this).attr('links'));

        var linksBlock = '<div style="text-align: left; margin: 10px 0px; border-top:1px solid #ccc;"> <div style="clear: both;"></div>';


        links.forEach(function (link) {

            var title = link.title;
            var href = link.link;
            var image = link.image;

            linksBlock += '<div style="padding: 3px;"> <img style="float: left; margin-right: 5px; height: 20px;" src="' + image + '"/> <a target="_blank" href="' + href + '">' + title + '</a></div>';


        });

        linksBlock += '</div>';
        if($(this).attr('title') != undefined) {

            var title =  $(this).attr('title');
        }else{
            title = ''; 
        }
        $(this).attr('title', title + linksBlock);

    }
});


$('i[widgettype=NOTE]').tooltip({
        placement: 'auto',

    //'container': 'body',
        delay: { show: 500, hide: 50 },
        trigger: 'manual',
            html: true,

    });
 

$('i[widgettype=NOTE]').mouseenter(function () {


    $(this).parents().not('[sectionfixed="true"]').css('z-index', '99999999');
    $(this).tooltip('show');

});


$('i[widgettype=NOTE]').parent().mouseleave(function (e) {


    $(this).find('i').first().tooltip('hide');
    $(this).css('z-index', '');
    $(this).parents().not('[sectionfixed="true"]').css('z-index', '');

});


$('i[IconHover]').mouseenter(function (e) {

 $(this).attr('class', $(this).attr('IconHover'));

});


$('i[IconHover]').mouseleave(function (e) {


    $(this).attr('class', $(this).attr('IconNormal'));
});


$(document).on('mouseenter', '.ui-element[linktp="BLOCKLINK"]', (function (e) {
    var bl = $(this).closest('.ui-element');
   var container =  bl.parent();

    container.find('.ui-element').filter(function () {
        var ui  = $(this);

        if((ui.position().top > bl.position().top && ui.position().top <  (bl.position().top +  bl.height() ))
        && (ui.position().left > bl.position().left && ui.position().left <  (bl.position().left +  bl.width())
        )){
            return true;

        }else{
            return false;
        }
    }).each(function () {

      
        $(this).mouseenter().addClass('hovering');
        $(this).find('[widgettype="ICON"], .LsConstructorElement').first().mouseenter().addClass('hovering');
    });

}));

$(document).on('mouseleave', '.ui-element[linktp="BLOCKLINK"]', (function (e) {


    var bl = $(this).closest('.ui-element');



    var container = bl.parent();
    container.find('.hovering').each(function () {


        $(this).removeClass('hovering').mouseleave();
    });


}));

$('.HasBsection').each(function () {

    var width = $(this).width();
/*
    var img = new Image();

    img.width = width;
    img.onload = function() {

        this.width = width;
        this.hwidth = 'auto';

        alert(this.height); 
    }


    img.src =   $(this).css('background-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
*/

    $(this).css('background-size', width+'px');
    
    $(this).find('.blockb').css({
        'background-size' : width+'px',
        'display' : 'block',
        'width' : '50%',


    }).append('<div class="blockb-line"></div>');


});



$('.HasBsection').mouseenter(function (e) {

    canOpenPanel = false;

});$('.HasBsection').mouseleave(function (e) {

    canOpenPanel = true;

});

$('.HasBsection').mousemove(function (e) {


    var width = $(this).width();
    var relX = e.pageX - $(this).offset().left;




    $(this).find('.blockb').css({
        'width' : (width - relX)+'px'

    });


    //console.log(e);


});


/*
$(document).on('drag','.blockb-line-hand' ,function (e) {



    var ui = $(this).closest('section');
    var width = ui.width();

//.touches[0]
    var relX = e.pageX - $(this).offset().left;

    console.log(e);


    ui.find('.blockb').css({
        'width' : ((width - relX)+25)+'px'

    });


    //console.log(e);
)

});

*/

 function updateFixing(scroll){


    $('[sectionfixed="true"]').each(function () {


        $(this).css('z-index', '99997');
        var scrollvalue = $(this).attr('scroll');

        if(scrollvalue == undefined || scrollvalue <= scroll){
            $(this).removeClass('hidden');

        }else{
            $(this).addClass('hidden');

        }


    });

}

updateFixing(0);



$(document).scroll(function () {

    updateFixing($(this).scrollTop());
});



$('.ui-element[eskEvent]').each(function () {

    var element = $(this);


    var events = JSON.parse(element.attr('eskEvent'));

    events.forEach(function (obj) {



        if(obj.event == 'click'){
            element.css('cursor', 'pointer');
        }

        obj.actions.forEach(function (obj) {
        $(document).on(obj.event, '#'+element.attr('id'), function (e) {

           // $('#'+obj.panel).find('.dinamicState').addClass('hidden');

            if(obj.action == 'popup'){

                openFancyPopup('#'+obj.popup);
                return;
            }
            if(obj.action == 'link'){

                window.location = obj.page+'.html';
                return;
            }



            var state = $('[dinamicstatekey="'+obj.state+'"]');

            var panel =  $('[dinamickey="'+obj.panel+'"]');




            if(obj.action == 'show'){
                panel.each(function () {

                   $(this).children('.dinamicState').addClass('hidden').removeClass('activeState');
               });


                state.removeClass('hidden').addClass('activeState');
            }

            if(obj.action == 'toggle'){
                panel.each(function () {

                   $(this).children('.dinamicState').not(state).addClass('hidden').removeClass('activeState');
               });

                state.toggleClass('hidden');

                if(state.hasClass('hidden')){

                    state.removeClass('activeState');
                }else{
                    state.addClass('activeState');

                }
            }




            if(obj.action == 'next'){
                dinamicsNext(state, panel);

            }


            if(obj.action == 'prev'){
                dinamicsPrev(state, panel);

            }


            if(obj.action == 'hide'){
            //   $('#'+obj.panel).find('.dinamicState').addClass('hidden');




                if(e.type == 'mouseleave'  && $(e.toElement).closest('[dinamickey="'+obj.panel+'"]').length  != 0){

                }else{
                    state.addClass('hidden').removeClass('activeState');
                }


            }




            //var panl = $('[dinamickey="'+obj.panel+'"]');


            if(panel.children('.activeState').length == 0){
                panel.closest('.ui-element').addClass('hidden');
            }else{
                panel.closest('.ui-element').removeClass('hidden');
            }





        });


    });
        
    });



});

        function dinamicsNext(state, panel) {


            var st = panel.children('.activeState').first();

            panel.each(function () {

                $(this).children('.dinamicState').addClass('hidden').removeClass('activeState');
            });


            var next = st.next();

            if(next.length  == 0){
                next = panel.children('.dinamicState').first();
            }


            var key = next.attr('dinamicstatekey');
            $('[dinamicstatekey="'+key+'"]').removeClass('hidden').addClass('activeState');


        }

        function dinamicsPrev(state, panel) {

            var st = panel.children('.activeState').first();
            panel.each(function () {

                $(this).children('.dinamicState').addClass('hidden').removeClass('activeState');
            });


            var previous = st.prev();

            if(previous.length == 0){
                previous = panel.children('.dinamicState').last();
            }


            var key = previous.attr('dinamicstatekey');
            $('[dinamicstatekey="'+key+'"]').removeClass('hidden').addClass('activeState');
           // previous.removeClass('hidden').addClass('activeState');

        }


