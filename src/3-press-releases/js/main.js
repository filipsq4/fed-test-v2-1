var pressReleaseWidget = {
    options: {
        containerSelector: '.module-press-release',
        template: (
            '{{#.}}' +
                '{{#filteredItems}}' +
                '<div class="module-press-release_item">' +
                    '<h2 class="module-press-release_headline">{{headline}}</h2>' +
                    '<p class="module-press-release_date">{{date}}</p>' +
                    '<p class="module-press-release_short-body">{{shortBody}}</p>' +
                    '<a class="button" href="{{relatedDoc}}">Download PDF</a>' +
                    '<a class="button" href="{{url}}">Read more</a>' +
                '</div>' +
                '{{/filteredItems}}' +
            '{{/.}}'                    
        )
    },

    init: function() {
        var templateItems = this.beforeRenderItems(prContent)
        this.renderPRs(templateItems || []);
        this.complete();
    },

    beforeRenderItems(content){
        console.log(content);
        content.filteredItems = [];

        content.items.forEach(function (el, ind, arr) {
            if(!el.tags.includes('earnings')) {
                content.filteredItems.push(el)
            }
        });

        return content;
    },

    renderPRs: function(prItems) {
        var inst = this,
            options = inst.options;

        $(options.containerSelector).html(Mustache.render(options.template, prItems));
    },

    complete: function() {
        // Add Slick Slider here (https://kenwheeler.github.io/slick/)

        $('.module-press-release').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            arrows:true,
            slidesToScroll: 3,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: true,
                  arrows:true,
                  dots: true
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots:true,
                  arrowss:true,
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
              // You can unslick at a given breakpoint now by adding:
              // settings: "unslick"
              // instead of a settings object
            ]
          });
    }
};

pressReleaseWidget.init();