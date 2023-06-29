CKEDITOR.dialog.add('titleboxDialog', function( editor ) {
    return {
        title: 'Tiêu đề bài viết',
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
                            element.setHtml(`<div id="content_title" style="text-align:center"><h1 id="h1_main">${this.getValue()}</h1></div></br>`);
                        }
                    }
                ]
            }
           
        ],

        onShow: function() {
            var selection = editor.getSelection();
            var element = selection.getStartElement();

            if ( element )
                element = element.getAscendant( 'titlebox', true );

            if ( !element || element.getName() != 'titlebox' ) {
                element = editor.document.createElement( 'titlebox' );
                this.insertMode = true;
            }
            else
                this.insertMode = false;

            this.element = element;
            if ( !this.insertMode )
                this.setupContent( this.element );
        },

        onOk: function() {
            var titlebox = this.element;
            this.commitContent( titlebox );
           
            if ( this.insertMode )
                editor.insertElement( titlebox );
        }
    };
});
