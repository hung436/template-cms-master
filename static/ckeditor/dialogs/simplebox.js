CKEDITOR.dialog.add('simplebox', function (editor) {
    return {
        title: 'Sửa Box ghi chú',
        minWidth: 200,
        minHeight: 100,
        contents: [
            {
                id: 'info',
                elements: [
                    {
                        id: 'align',
                        type: 'select',
                        label: 'căn chỉnh',
                        items: [
                            [editor.lang.common.notSet, ''],
                            [editor.lang.common.alignLeft, 'left'],
                            [editor.lang.common.alignRight, 'right'],
                            [editor.lang.common.alignCenter, 'center']
                        ],
                        setup: function (widget) {
                            this.setValue(widget.data.align);
                        },
                        commit: function (widget) {
                            widget.setData('align', this.getValue());
                        }
                    },
                    {
                        id: 'width',
                        type: 'text',
                        label: 'Chiều rộng',
                        width: '50px',
                        setup: function (widget) {
                            this.setValue(widget.data.width);
                        },
                        commit: function (widget) {
                            widget.setData('width', this.getValue());
                        }
                    }
                ]
            }
        ]
    };
});
