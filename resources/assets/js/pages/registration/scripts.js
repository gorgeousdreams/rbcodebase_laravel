'use strict';

(function() {

    $(function() {
        var config = $.localStorage.get('config');
        var colors = config.colors;
        $('form').submit(function(event){
            var form = $(this);
            if(! form.find('input[name=agreement]').is(':checked') ) {
                swal({
                    text: 'You must accept the terms and conditions to register.',
                    confirmButtonColor: colors.secondary
                });

                event.preventDefault();
            }
        });
    });

})();

