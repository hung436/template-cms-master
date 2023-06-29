CKEDITOR.dialog.add('sapoboxDialog', function( editor ) {
    return {
        title: 'Caption Bài viết',
        minWidth: 600,
        minHeight: 100,

        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'textarea',
                        id: 'content',
                        label: 'Nôi dung',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Nội dung không được để trống" ),

                        setup: function( element ) {
                            this.setValue( element.getText() );
                        },

                        commit: function( element ) {
                            element.setHtml(`<div id="content_caption"><h2 id="h2_main">${this.getValue()}</h2></div></br>`);
                        }
                    }
                ]
            }
           
        ],

        onShow: function() {
            var selection = editor.getSelection();
            var element = selection.getStartElement();

            if ( element )
                element = element.getAscendant( 'sapobox', true );

            if ( !element || element.getName() != 'sapobox' ) {
                element = editor.document.createElement( 'sapobox' );
                this.insertMode = true;
            }
            else
                this.insertMode = false;

            this.element = element;
            if ( !this.insertMode )
                this.setupContent( this.element );
        },

        onOk: function() {
            var sapobox = this.element;
            this.commitContent( sapobox );
           
            if ( this.insertMode )
                editor.insertElement( sapobox );
        }
    };
});
