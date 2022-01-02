let menuIcon = document.querySelector('.menuIcon');
let nav = document.querySelector('.overlay-menu');

menuIcon.addEventListener('click', () => {
    if (nav.style.transform != 'translateX(0%)') {
        nav.style.transform = 'translateX(0%)';
        nav.style.transition = 'transform 0.2s ease-out';
    } else {
        nav.style.transform = 'translateX(-100%)';
        nav.style.transition = 'transform 0.2s ease-out';
    }
});


// Toggle Menu Icon ========================================
let toggleIcon = document.querySelector('.menuIcon');

toggleIcon.addEventListener('click', () => {
    if (toggleIcon.className != 'menuIcon toggle') {
        toggleIcon.className += ' toggle';
    } else {
        toggleIcon.className = 'menuIcon';
    }
});

$(function () {
    window.addEventListener('scroll', () => {
        // console.log(document.querySelector('#header').getBoundingClientRect().bottom - document.querySelector('#header').scrollTop)
        if (document.querySelector('#header').getBoundingClientRect().bottom - document.querySelector('#header').scrollTop <= 0) {
            $("#navbar").addClass('navbarScrolled');
        } else {
            $("#navbar").removeClass('navbarScrolled');
        }
    })

    $('#menu li a').click(() => {
        $(".menuIcon.toggle").click()
    })

    $('body').on('click', '.buy', function () {
        $(this).parent().parent().addClass("clicked");
    });

    $('body').on('click', '.remove', function () {
        $(this).parent().parent().parent().removeClass("clicked");
    });

    let uniqueBrands = [];
    fetch("./products.json")
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            console.log(jsondata)
            let content = ``
            jsondata.map(e => {
                !uniqueBrands.includes(e.brand) ? uniqueBrands.push(e.brand) : ''
                content += `
                <div class="col-lg-3 col-md-4 col-sm-6 col-12 p-0" data-id='${e.id}' data-brand="${e.brand}">
                    <div class="miniContainer p-0">
                        <div class="top"
                            style="background: url(img/${e.img}) no-repeat center center;">
                        </div>
                        <div class="bottom">
                            <div class="left">
                                <div class="details">
                                    <h1>${e.title}</h1>
                                    <p>3.800֏ - 13.000֏</p>
                                </div>
                                <div class="buy"><i class="fa fa-cart-plus"></i></div>
                            </div>
                            <div class="right">
                                <div class="w-50">
                                    <div class="done"><i class="fa fa-check"></i></div>
                                    <div class="remove"><i class="fa fa-times"></i></div>
                                </div>
                                <div class="details">
                                    <h1>${e.title}</h1>
                                    <p>3.800֏ - 13.000֏</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="inside">
                        <div class="icon"><i class="fa fa-info-circle"></i></div>
                        <div class="contents">
                            <table>
                                <tr>
                                    <th>Brand</th>
                                </tr>
                                <tr>
                                    <td>${e.brand}</td>
                                </tr>
                                <tr>
                                    <th>Չոր - 15ml/25ml/35ml</th>
                                </tr>
                                <tr>
                                    <td>3.800֏/6.000֏/7.500֏</td>
                                </tr>
                                <tr>
                                    <th>Կաթնային 17ml/35ml/60ml</th>
                                </tr>
                                <tr>
                                    <td>4.000֏/8.000֏/13.000֏</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                `
            })
            console.log(uniqueBrands)
            $('#products > div > div').html(content)
            content = ``
            uniqueBrands.map(brand => {
                content += `<div class="form-group col-lg-3 col-md-4 col-sm-6">
                                <input type="checkbox" id="${brand}" checked>
                                <label for="${brand}">${brand}</label>
                            </div>`
            })
            $('#filters form').append(content)


            return jsondata
        });

    $('#checkAll').click(function () {
        console.log($(this).filter(":checked").length)
        $('#filters > div > form > div > input').prop('checked', this.checked);
        if ($(this).filter(":checked").length) {
            $("[data-brand]").show()
        } else {
            $("[data-brand]").hide()
        }
    });

    $('body').on('change', '#filters > div > form > div > input', function () {
        if ($(this).filter(":checked").length) {
            $(`[data-brand="${$(this).parent().find("label").text()}"]`).show()
        } else {
            $(`[data-brand="${$(this).parent().find("label").text()}"]`).hide()
        }
        let check = ($('#filters > div > form > div > input').filter(":checked").length == $('#filters > div > form > div > input').length);
        $('#checkAll').prop("checked", check);
    });

    $('#search').keyup(() => {
        $("[data-brand]").each(function (index) {
            console.log(index + ": " + $(this).find('.bottom .left .details h1').text(), "==="+ $(this).data('brand'));
            if($(this).find('.bottom .left .details h1').text().toLowerCase().indexOf($('#search').val().toLowerCase()) > -1 || $(this).data('brand').toLowerCase().indexOf($('#search').val().toLowerCase()) > -1){
                $(this).show()
            } else {
                $(this).hide()
            }
        });
        console.log($('#search').val())
    })

});