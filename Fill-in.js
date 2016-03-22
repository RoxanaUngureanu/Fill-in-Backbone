$(function(){
    var AppModel = Backbone.Model.extend({
        defaults:{
                specification:'Completeaza textul de mai jos.',
                value: [],
                answer:[],
                setTries: 1,
                tried: 0
            }
    });
    var AppView = Backbone.View.extend({

        el: '.container',
        events: {
            'click #add-input':'addInput',
            'click #preview-btn':'previewState',
            'click #edit-btn':'editState',
            'click #validate-btn':'validateAnswer',
            'click #solution-btn':'getSolution',
            'change #select-btn': 'selectMode'
        },
        addInput: function(){
            $('.edit-box').append(
                '<input value="">'
            );
        },
        previewState: function(){
            this.saveInputValue();

            $('.specification').attr('contenteditable',false);
            $('.edit-box').attr('contenteditable',false);
            $('.button-box').css('display','none');
            $('.preview-btns').css('display','block');
            $('.edit-box input').val('');
            $('#solution-btn').prop('disabled',true);
        },
        editState:function(){
            $('.specification').attr('contenteditable',true);
            $('.edit-box').attr('contenteditable',true);
            $('.button-box').css('display','block');
            $('.preview-btns').css('display','none');
            $('.edit-box input').val(appModel.get('value'));
            this.putInputValue()
        },
        saveInputValue:function(){
            var tries = parseInt($('#tries-input').val());

            var val = $('.edit-box input').map(function(){

                return this.value;
            }).get();

            appModel.set({'value': val});
            appModel.set({'setTries':tries});

        },
        putInputValue:function(){
            var inputVal = appModel.get('value');
                $.each(inputVal, function(index,val){
                    $('.edit-box input').eq(index).val(val);
                });
        },
        validateAnswer: function(){
            var inputVal = appModel.get('value');
            var tried = appModel.get('tried');
            var setTries = appModel.get('setTries');

            var val = $('.edit-box input').map(function(){
                return this.value;
            }).get();

            appModel.set({'answer': val});
            var answerVal =  appModel.get('answer');

            if(tried < setTries){
                for (var i=0; i<inputVal.length; i++)
                    if (inputVal[i] == answerVal[i]){
                        $('.edit-box input').eq(i).addClass('right');

                    } else {
                        $('.edit-box input').eq(i).addClass('wrong');
                    }

                tried++;
                appModel.set({'tried': tried});
            } else {
                $('#solution-btn').prop('disabled',false);
            }
        },
        getSolution: function(){
            this.putInputValue();
        },
        selectMode: function(e){
            var optionSelected = e.currentTarget.value;

            if (optionSelected === '1'){
                $('#tries-btn').css('display','inline-block');

            } else if (optionSelected === '2' ){
                $('#tries-btn').css('display','none');
            }
        },

        render: function () {
            $('.specification').html('<p>' + appModel.get('specification') + '</p>')
        }
    });

    var appModel = new AppModel({});

    var app = new AppView;
    app.render();
});
