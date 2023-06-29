CKEDITOR.plugins.add('simplebox', {
    requires: 'widget',

    icons: 'simplebox',

    init: function (editor) {
        CKEDITOR.dialog.add('simplebox', '/ckeditor/dialogs/simplebox.js');

        editor.widgets.add('simplebox', {

            button: 'Tạo Box ghi chú',

            template:
                '<div class="simplebox box-note">' +
                '<div class="simplebox-content"><p>Nhập nội dung chú thích...</p></div>' +
                '</div>',

            editables: {
                content: {
                    selector: '.simplebox-content',
                    allowedContent: 'b p br ul ol li strong em'
                }
            },

            allowedContent:
                'div(!simplebox,align-left,align-right,align-center){width};' +
                'div(!simplebox-content)',

            requiredContent: 'div(simplebox)',

            dialog: 'simplebox',

            upcast: function (element) {
                return element.name == 'div' && element.hasClass('simplebox');
            },

            init: function () {
                var width = this.element.getStyle('width');
                if (width)
                    this.setData('width', width);
                if (this.element.hasClass('align-left'))
                    this.setData('align', 'left');
                if (this.element.hasClass('align-right'))
                    this.setData('align', 'right');
                if (this.element.hasClass('align-center'))
                    this.setData('align', 'center');
            },

            data: function () {

                if (this.data.width == '')
                    this.element.removeStyle('width');
                else
                    this.element.setStyle('width', this.data.width);

                this.element.removeClass('align-left');
                this.element.removeClass('align-right');
                this.element.removeClass('align-center');
                if (this.data.align)
                    this.element.addClass('align-' + this.data.align);
            }
        });
    }
});
CKEDITOR.plugins.add("titlebox", {
    init: function (editor) {
        editor.addCommand(
            "titlebox",
            new CKEDITOR.dialogCommand("titleboxDialog")
        );

        editor.ui.addButton("Titlebox", {
            label: "Thêm Tiêu đề (h1)",
            command: "titlebox",
            icon: "Form",
        });

        if (editor.contextMenu) {
            editor.addMenuGroup("titleboxGroup");
            editor.addMenuItem("titleboxItem", {
                label: "Sửa Tiêu đề (h1) ",
                icon: "Form",
                command: "titlebox",
                group: "titleboxGroup",
            });

            editor.contextMenu.addListener(function (element) {
                if (element.getAscendant("titlebox", true)) {
                    return { titleboxItem: CKEDITOR.TRISTATE_OFF };
                }
            });
        }

        CKEDITOR.dialog.add("titleboxDialog", "/ckeditor/dialogs/titleBox.js");
    },
});
CKEDITOR.plugins.add("sapobox", {
    init: function (editor) {
        editor.addCommand(
            "sapobox",
            new CKEDITOR.dialogCommand("sapoboxDialog")
        );

        editor.ui.addButton("SapoBox", {
            label: "Thêm Caption(h2)",
            command: "sapobox",
            icon: "Form",
        });

        if (editor.contextMenu) {
            editor.addMenuGroup("sapoboxGroup");
            editor.addMenuItem("sapoboxItem", {
                label: "Sửa Caption(h2)",
                icon: "Form",
                command: "sapobox",
                group: "sapoboxGroup",
            });

            editor.contextMenu.addListener(function (element) {
                if (element.getAscendant("sapobox", true)) {
                    return { sapoboxItem: CKEDITOR.TRISTATE_OFF };
                }
            });
        }

        CKEDITOR.dialog.add("sapoboxDialog", "/ckeditor/dialogs/sapoBox.js");
    },
});