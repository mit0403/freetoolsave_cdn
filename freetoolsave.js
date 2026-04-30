
// --------------------------------------------------------------
// meet js for image rendering.
// --------------------------------------------------------------
async function getImageData() {
    const input = document.getElementById('add-logo');
    const file = input.files[0];

    if (!file) {
        console.warn('No file selected');
        return null;
    }

    // We wrap the FileReader in a Promise so we can "await" the result
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64Data = reader.result;
            resolve(base64Data); // This "returns" the data to our await call
        };

        reader.onerror = (error) => reject(error);

        reader.readAsDataURL(file); // This starts the conversion to Base64
    });
}

// ---------------------------------------------------------------
//  some generic js.....
// --------------------------------------------------------------- 

var webapp_url = "https://betaapp.mooninvoice.com/live_webapp/";

var loadFile = function (event) {
    var file = event.target.files[0];
    var output = document.getElementById('ffffffffffff');
    var errorContainer = document.querySelector('.companylogo_er');

    // Clear previous error
    errorContainer.textContent = '';

    // Check if a file is selected
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        errorContainer.textContent = 'Please upload a valid image file.';
        event.target.value = ''; // Clear the input
        output.src = 'https://cdn.mooninvoice.com/image/images/add-logo.svg'; // Reset preview
        $('.add-logo-label').removeClass('logo-preview');
        return;
    }

    // Show the preview
    output.src = URL.createObjectURL(file);
    $('.add-logo-label').addClass('logo-preview');
};

var btn = $('.scroll_top_div');

$(window).scroll(function () {
    if ($(window).scrollTop() > 30) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});
btn.on('click', function (e) {
    // Prevent default behavior
    e.preventDefault();
    e.stopImmediatePropagation();

    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

$('body').on('click', '.close-add-logo', function () {
    $('#add-logo').val('');
    var output = document.getElementById('ffffffffffff');
    output.src = "https://cdn.mooninvoice.com/image/images/add-logo.svg";
    $('.add-logo-label').removeClass('logo-preview');
    document.querySelector('.companylogo_er').textContent = '';
});

$('.toogle_menu').on("click", function (e) {
    $('.togglemenu').toggleClass('side-open');
    $('.footer_invoice').toggleClass('sidebar-open');
    $('.header_invoice').toggleClass('sidebar-open');
    $('.body_invoice').toggleClass('sidebar-open');
    $('.body_wrap').toggleClass('sidebar-open');
    $('body').toggleClass('aside-open');
    e.stopPropagation();
});
$(document).on("click", function () {
    if ($(window).width() < 991) {
        $('.togglemenu').removeClass('side-open');
        $('.footer_invoice').removeClass('sidebar-open');
        $('.header_invoice').removeClass('sidebar-open');
        $('.body_invoice').removeClass('sidebar-open');
        $('body').removeClass('aside-open');
        $('.body_wrap').removeClass('sidebar-open');
        $('.togglemenu').removeClass('mobile-side-open');
    }
});

$(document).ready(function () {
    var speed = 400;

    // 1. Hide all panel bodies first
    $(".accpanelbody").hide();

    // 2. Open first panel on page load
    $(".accrdPanel")
        .first()
        .addClass("open active")
        .find(".accpanelbody")
        .slideDown(speed);

    // 3. Click handler
    $(".accrdPanelHeading").on("click", function () {
        var currentPanel = $(this).closest(".accrdPanel");
        var currentBody = currentPanel.find(".accpanelbody");

        // If clicked panel is already open → close it
        if (currentPanel.hasClass("open")) {
            currentPanel
                .removeClass("open active")
                .find(".accpanelbody")
                .stop(true, true)
                .slideUp(speed);
        }
        // Else → close others & open clicked one
        else {
            $(".accrdPanel.open")
                .removeClass("open active")
                .find(".accpanelbody")
                .stop(true, true)
                .slideUp(speed);

            currentPanel
                .addClass("open active")
                .find(".accpanelbody")
                .stop(true, true)
                .slideDown(speed);
        }
    });
});

$('.click_chat').on("click", function () {
    $('.cc-ge4v').attr('data-visible', 'true');
});


// ---------------------------------------------------------------
// ui icons js.....
// ---------------------------------------------------------------

//  Select template modal js 
function updateInvTplHeight() {
    const grid = document.querySelector(".invTpl-grid");
    if (!grid) return;

    const h = window.innerHeight;

    if (h < 800) {
        grid.style.maxHeight = "80dvh";
    } else {
        grid.style.maxHeight = "90dvh";
    }

    grid.style.overflowY = "auto";
}

/* 🔒 lock scroll properly */
function lockInvTplScroll() {
    const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = scrollBarWidth + "px";
}

/* 🔓 unlock scroll */
function unlockInvTplScroll() {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
}

function invTplOpen() {
    const el = document.getElementById("invTplContainer");

    el.style.display = "flex";

    // 🔒 stop background scroll
    lockInvTplScroll();

    setTimeout(() => {
        el.classList.add("show");

        updateInvTplHeight();
    }, 10);
}

function invTplClose() {
    const el = document.getElementById("invTplContainer");

    el.classList.remove("show");

    setTimeout(() => {
        el.style.display = "none";

        // 🔓 restore background scroll
        unlockInvTplScroll();
    }, 300);
}

function invTplSelect(el) {
    if (el.classList.contains("invTpl-locked")) return;

    document.querySelectorAll(".invTpl-card").forEach(c => {
        c.classList.remove("active");
    });

    el.classList.add("active");
}

/* 🔁 responsive update */
window.addEventListener("resize", () => {
    updateInvTplHeight();
});


//-------------------------------------
// download button 
//-------------------------------------

/**
 * Perform direct download or print action
 * @param {string} action - 'download' or 'print'
 */
window.performDocumentAction = function (action) {
    if (typeof pdfContent !== 'undefined' && pdfContent) {
        if (action === 'print') {
            if (typeof printPDF === 'function') {
                printPDF();
            } else {
                console.error("printPDF function not found");
            }
        } else {
            const link = document.createElement('a');
            link.href = pdfContent;
            link.download = (window.downloadPageName || 'Document') + '.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } else {
        alert('PDF content is not ready. Please wait or try again.');
    }
};

const openBtn = document.getElementById("download-modal-trigger");

const modal = document.querySelector(".download-modal-overlay");
const closeBtn = document.querySelector(".download-modal-close");

// Get scrollbar width
function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

// Open modal
openBtn.addEventListener("click", (e) => {
    // Bypass modal if user has already submitted
    if (localStorage.getItem('user_submit') == 'true' || window.user_submitted) {
        const action = openBtn.getAttribute('data-action') || 'download';
        performDocumentAction(action);
        return;
    }

    const scrollBarWidth = getScrollbarWidth();


    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = scrollBarWidth + "px";

    /* ── Update modal labels based on $page_name set in the Blade template ── */
    var pageName = window.downloadPageName || 'Invoice'; // fallback to "Invoice"
    var action = openBtn.getAttribute('data-action') || 'download';
    var verb = action === 'print' ? 'Print' : 'Download';
    var titleEl = document.getElementById('downloadModalTitle');
    var subtitleEl = document.getElementById('downloadModalSubtitle');
    var btnEl = document.getElementById('downloadModalBtn');
    if (titleEl) titleEl.textContent = verb + ' ' + pageName;
    if (subtitleEl) subtitleEl.textContent = 'Please provide your information to ' + verb.toLowerCase() + ' the ' + pageName.toLowerCase();
    if (btnEl) {
        btnEl.textContent = verb + ' ' + pageName;
        btnEl.setAttribute('data-action', action);
    }
    /* ──────────────────────────────────────────────────────────────────────── */

    modal.classList.add("active");
});

// Print button — opens the same modal with "Print {page_name}" labels
const printBtn = document.getElementById("print-modal-trigger");
if (printBtn) {
    printBtn.addEventListener("click", (e) => {
        // Bypass modal if user has already submitted
        if (localStorage.getItem('user_submit') == 'true' || window.user_submitted) {
            performDocumentAction('print');
            return;
        }

        const scrollBarWidth = getScrollbarWidth();

        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = scrollBarWidth + "px";
        var pageName = window.downloadPageName || 'Invoice';
        var titleEl = document.getElementById('downloadModalTitle');
        var subtitleEl = document.getElementById('downloadModalSubtitle');
        var btnEl = document.getElementById('downloadModalBtn');
        if (titleEl) titleEl.textContent = 'Print ' + pageName;
        if (subtitleEl) subtitleEl.textContent = 'Please provide your information to print the ' + pageName.toLowerCase();
        if (btnEl) {
            btnEl.textContent = 'Print ' + pageName;
            btnEl.setAttribute('data-action', 'print');
        }
        modal.classList.add("active");
    });
}

// Handle click on the modal button (Download or Print)
const downloadModalBtn = document.getElementById("downloadModalBtn");
if (downloadModalBtn) {
    downloadModalBtn.addEventListener("click", () => {
        const action = downloadModalBtn.getAttribute('data-action');

        // console.log(action); 

        if (action === 'print') {
            // Call the existing printPDF function
            // printPDF();

            // Close the modal after triggering print
            if (modal) modal.classList.remove("active");
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        } else {
            // This is the default "Download" behavior
            // The existing lead capture logic (if any) should go here
            console.log("Download action triggered");
        }
    });
}

// Close modal
closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");

    jobValue.innerText = "";

    jobGroup.classList.remove("active", "open");

    jobOptions.forEach(opt => opt.classList.remove('active'));

    setTimeout(() => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
    }, 300);
});
// custom js for field

const countries = [{
    name: 'Afghanistan',
    code: '+93',
    iso: 'af'
},
{
    name: 'Albania',
    code: '+355',
    iso: 'al'
},
{
    name: 'Algeria',
    code: '+213',
    iso: 'dz'
},
{
    name: 'Argentina',
    code: '+54',
    iso: 'ar'
},
{
    name: 'Australia',
    code: '+61',
    iso: 'au'
},
{
    name: 'Belgium',
    code: '+32',
    iso: 'be'
},
{
    name: 'Brazil',
    code: '+55',
    iso: 'br'
},
{
    name: 'Canada',
    code: '+1',
    iso: 'ca'
},
{
    name: 'China',
    code: '+86',
    iso: 'cn'
},
{
    name: 'France',
    code: '+33',
    iso: 'fr'
},
{
    name: 'Germany',
    code: '+49',
    iso: 'de'
},
{
    name: 'Japan',
    code: '+81',
    iso: 'jp'
},
{
    name: 'Mexico',
    code: '+52',
    iso: 'mx'
},
{
    name: 'Pakistan',
    code: '+92',
    iso: 'pk'
},
{
    name: 'Russia',
    code: '+7',
    iso: 'ru'
},
{
    name: 'Singapore',
    code: '+65',
    iso: 'sg'
},
{
    name: 'United Arab Emirates',
    code: '+971',
    iso: 'ae'
},
{
    name: 'United Kingdom',
    code: '+44',
    iso: 'gb'
},
{
    name: 'United States',
    code: '+1',
    iso: 'us'
}
];

const list = document.getElementById('countryList');
countries.forEach(c => {
    const li = document.createElement('li');
    li.className = 'login-country-item';
    li.onclick = () => selectCountry(c.name, c.code, c.iso);
    li.innerHTML = `
                    <img src="https://flagcdn.com/w20/${c.iso}.png" class="login-flag-icon" style="margin-right: 12px;">
                    <span class="login-country-name">${c.name}</span>
                    <span class="login-country-code">${c.code}</span>
                `;
    list.appendChild(li);
});

function toggleDropdown(e) {
    e.stopPropagation();
    document.getElementById('countryDropdown').classList.toggle('show');
    document.getElementById('countrySearch').focus();
}

function selectCountry(name, code, iso) {
    document.getElementById('selectedFlag').src = `https://flagcdn.com/w20/${iso}.png`;
    document.getElementById('selectedCode').innerText = code;
    document.getElementById('countryDropdown').classList.remove('show');
}

function filterCountries() {
    const val = document.getElementById('countrySearch').value.toLowerCase();
    document.querySelectorAll('.login-country-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(val) ? 'flex' : 'none';
    });
}


window.onclick = () => document.getElementById('countryDropdown').classList.remove('show');



window.onload = function () {
    // Focus first field without scrolling (avoids scroll jump on reload when autofocus was used)
    var businessNameEl = document.getElementById('business_name');
    if (businessNameEl) {
        businessNameEl.focus({
            preventScroll: true
        });
    }
}

const jobGroup = document.getElementById('jobRoleGroup');
const jobTrigger = document.getElementById('jobRoleTrigger');
const jobValue = document.getElementById('jobRoleValue');
const jobOptions = document.querySelectorAll('.download-modal-option');

// Toggle open state on trigger click
jobTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    jobGroup.classList.toggle('open');
    // If we are opening it, label should float up
    if (jobGroup.classList.contains('open')) {
        jobGroup.classList.add('active');
    } else if (jobValue.innerText === "") {
        // If closing and no value, return label to center
        jobGroup.classList.remove('active');
    }
});

// Handle option selection
jobOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedText = option.innerText;
        jobValue.innerText = selectedText;

        // Update active state in list
        jobOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');

        // Close panel and keep label floated
        jobGroup.classList.remove('open');
        jobGroup.classList.add('active');
    });
});

// Close when clicking anywhere outside
window.addEventListener('click', () => {
    jobGroup.classList.remove('open');
    // Reset label position if no value was chosen
    if (jobValue.innerText === "") {
        jobGroup.classList.remove('active');
    }
});


// ---------------------------------------------------------------
// document render and form handling with and pdf showing......
// ---------------------------------------------------------------

$(document).ready(function (e) {
    var counter = 2;
    $(".shipping_cost").blur(function () {
        var shipping_length = $(this).val().length;
        if (shipping_length === 0) {
            $(".checkLabl").removeClass("blank_space");
        } else {
            $('.checkLabl').addClass("blank_space");
        }
    });

    $(document).on('click', '.delete_item', function () {
        var for_val = $(this).attr('for');
        $("#delete_item_" + for_val).remove();
        getTotalCost(for_val);
        table_tr--;
        reOrderRows();

    });

    function reOrderRows() {
        $("#invoice_list tr").each(function (index, el) {
            index += 1;
            if (index === 0)
                return false;

            $(this).children('td').first().text(index++);
        });
    }
    var date = new Date().toLocaleDateString('en-US');
    $(function () {
        var todaydt = new Date();
        $("#customer_date").datepicker({
            autoclose: true,
            endDate: todaydt,
            minDate: 0,
            onSelect: function (date) {
                //Get selected date 
                var date2 = $('#customer_date').datepicker('getDate');
                //sets minDate to txt_date_to
                $('#customer_due_date').datepicker('option', 'minDate', date2);
            }
        }).val(date);
        $('#customer_due_date').datepicker({
            minDate: 0
        }).val(date);
    });

    var currency_symbol = '';



    // Set Currency 
    // https://betaapp.mooninvoice.com/live_webapp/get_currencies_public


    $.ajax({

        url: webapp_url + 'get_currencies_public',
        type: "POST",
        success: function (data) {
            // console.log(data);
            try {
                var jss = typeof data === 'string' ? JSON.parse(data) : data;
                if (jss && jss.data) {
                    $.each(jss.data, function (key, val) {
                        if (val.displayNameString === 'English' && val.is_delete === 0) {
                            var selected = '';
                            if (val.code == "USD") {
                                default_currecy = val.symbol;
                                selected = "selected";
                            }
                            $("#customer_currency").append('<option value="' + val
                                .currencylocale + '" ' + selected + ' data-symbol="' + val
                                    .symbol + '">' + val.currency_name + '</option>');
                            // $("#customer_currency").append("<option value='"+ val.symbol +"' "+ if(val.symbol == '$') { "selected" } +" >"+val.currency_name +"</option>");
                        }
                    });
                }
            } catch (e) {
                console.error("JSON parse error in get_currencies_public:", e);
            }
        }
    });

    if (default_currecy != '') {
        $('.add_symbol').text(default_currecy);
    } else {
        $('.add_symbol').html("$");
    }

    // Set Shipping Method
    // https://betaapp.mooninvoice.com/live_webapp/get_shipping_methods_public
    $.ajax({
        url: webapp_url + 'get_shipping_methods_public',
        type: 'POST',
        success: function (data) {
            // console.log(data);
            try {
                var shipping_method = typeof data === 'string' ? JSON.parse(data) : data;
                if (shipping_method && shipping_method.data) {
                    $.each(shipping_method.data, function (key, val) {

                        $("#shipping_method").append('<option value="' + val.name + '">' + val
                            .name + '</option>');
                    });
                }
            } catch (e) {
                console.error("JSON parse error in get_shipping_methods_public:", e);
            }
        }
    });


    $('body').on('change', function () {
        currency_symbol = $("#customer_currency").find(':selected').data('symbol');
        $(".add_symbol").text(currency_symbol);
    });
    // $('.add_symbol').text(currency_symbol);

    function validateEmailField() {

        let email = $('#business_email').val().trim();
        let $errorContainer = $('.business-email-test');

        $errorContainer.find('.email-error').remove();
        let isValid = true;

        if (email === '') {
            $errorContainer.append(
                '<span class="error email-error bottom-0" id="business_email-error" for="business_email">Email is required.</span>'
            );
            isValid = false;
        } else {
            var checkMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

            if (!checkMail) {
                $errorContainer.append(
                    '<p class="error email-error" id="business_email-error" for="business_email">Invalid email address.</p>'
                );
                let emailInput = document.getElementById('business_email');
                emailInput.style.setProperty('color', 'red', 'important');
                emailInput.style.setProperty('font-size', '12px', 'important');
                isValid = false;
            }
        }

        if (isValid) {
            let emailInput = document.getElementById('business_email');
            emailInput.style.setProperty('color', 'black', 'important');
            emailInput.style.setProperty('font-size', '16px', 'important');
        }
        return isValid;
    }

    $('#business_email').on('input', function () {
        validateEmailField();
    });

    $("#invoice_signup_form").validate({
        rules: {
            business_name: {
                required: true,
                minlength: 3,
                normalizer: function (value) {
                    return $.trim(value); // Trim spaces only before validation
                }
            },
            customer_detail: {
                required: true,
                minlength: 3,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
            business_address: {
                required: true,
                minlength: 3,
                normalizer: function (value) {
                    return $.trim(value);
                }
            },
            customer_invoice: {
                required: true,
                normalizer: function (value) {
                    return $.trim(value);
                }
            }
        },
        messages: {
            business_name: {
                required: "Business name is required.",
                minlength: "Min length 3 char"
            },
            customer_detail: {
                required: "Customer is required.",
                minlength: "Min length 3 char"
            },
            business_address: {
                required: "Business Address is required.",
                minlength: "Min length 3 char"
            },
            customer_invoice: {
                required: "Invoice Number is required.",
            },
        },
        errorElement: 'label',
        errorPlacement: function (error, element) {
            if (element.attr('name') == 'business_name') {
                error.insertAfter(".business_name_er");
            }
            if (element.attr('name') == 'customer_detail') {
                error.insertAfter(".customer_detail_er");
            }
            if (element.attr('name') == 'business_address') {
                error.insertAfter(".business_address_er");
            }
            if (element.attr('name') == 'customer_invoice') {
                error.insertAfter(".customer_invoice_er");
            }
        }
    });


    $("#main_tax_text").on("input", function () {
        $(this).css('border', '');
    });



    // my code-- meet
    $("#instantSaveBtn").on('click', async function (e) {
        e.preventDefault();
        const validate_email = validateEmailField();
        $("#invoice_signup_form").valid();

        if ($("#invoice_signup_form").valid() && validate_email) {
            $('.companylogo_er').text('');

            var gacookievalue = Cookies.get("_ga");
            var gacookievalue_final = gacookievalue.substr(6);
            var ga = gacookievalue_final;

            var utm_source_data = "<?php echo @$page_name; ?>";
            var utm_campaign_data = '';
            var utm_medium_data = 'website';

            var getfromurl = $("#getfromurl").val();

            if (getfromurl == 1) {
                if (utm_source_data != '' || utm_campaign_data != '') {
                    localStorage.setItem("mi_ga_ref_url", utm_source_data + ',' + utm_medium_data +
                        ',' + utm_campaign_data);
                }
            } else {
                var mi_ga_ref_url = localStorage.getItem("mi_ga_ref_url");
                console.log("mi_ga_ref_url : " + mi_ga_ref_url);

                if (mi_ga_ref_url == '' || mi_ga_ref_url == "undefined,undefined" ||
                    mi_ga_ref_url ==
                    "undefined,undefined,undefined" || mi_ga_ref_url == null || mi_ga_ref_url ==
                    'Website,,' || mi_ga_ref_url == 'Website,undefined,undefined') {
                    var utm_campaign_data = '';
                    var utm_medium_data = 'website';
                } else {
                    var mi_ga_ref_url = localStorage.getItem("mi_ga_ref_url").split(',');

                    if (mi_ga_ref_url[0] == '' || typeof mi_ga_ref_url[0] === "undefined") { } else {
                        utm_source_data = mi_ga_ref_url[0];
                    }

                    if (mi_ga_ref_url[2] == '' || typeof mi_ga_ref_url[2] === "undefined") { } else {
                        utm_campaign_data = mi_ga_ref_url[2];
                    }

                    if (mi_ga_ref_url[1] == '' || typeof mi_ga_ref_url[1] === "undefined") { } else {
                        utm_medium_data = mi_ga_ref_url[1];
                    }
                }
            }

            if (campiondata_fornewheader == 1 && utm_campaign_data == '') {
                utm_campaign_data = 'top-banner';
            }

            var utm_source = utm_source_data;
            var utm_campaign = utm_campaign_data;
            var utm_medium = utm_medium_data;



            var instantForm = $("#invoice_signup_form").serialize();
            var token = $('meta[name="csrf-token"]').attr('content');

            var form = $('#invoice_signup_form')[0];
            var formData = new FormData(form);
            //            var fd = new FormData();
            formData.append('ga', ga);
            formData.append('service_type', '1');
            formData.append('utm_source', utm_source);
            formData.append('utm_campaign', utm_campaign);
            formData.append('utm_medium', utm_medium);
            formData.append('page_name', "<?php echo @$page_name; ?>");
            formData.append('device_model', device_model);
            formData.append('device_os', os_name);
            formData.append('os_version', os_version);
            formData.append('browser', browser_name);
            formData.append('browser_version', browser_version);
            formData.append('device_id', ga);
            // formData.append('logo',sendBase64InFormData());

            // printing formdata collected. 
            // for (let [key, value] of formData.entries()) {
            //     console.log(key + ": ", value);
            // }

            // step-1 take formData object and convert to effective object.
            // const obj = Object.fromEntries(formData.entries());
            // console.log(obj);

            const obj = {};

            formData.forEach((value, key) => {
                // If the key already exists, turn it into an array (or push to it)
                if (obj.hasOwnProperty(key)) {
                    if (!Array.isArray(obj[key])) {
                        obj[key] = [obj[key]];
                    }
                    obj[key].push(value);
                } else {
                    // If it's the first time seeing the key, just set it
                    obj[key] = value;
                }
            });

            // localStorage.setItem("estimate_form", JSON.stringify(obj));

            // get base64 logo
            const base64Logo = await getImageData();
            if (base64Logo) {
                obj['companylogo'] = base64Logo;
            }

            // store to localstorage bcz it accepts only json.
            localStorage.setItem("estimate_form", JSON.stringify(obj));

            const estimate_form = JSON.parse(localStorage.getItem('estimate_form'));

            // console.log(estimate_form);


            const data = {

                "pageSize": "A4",
                "customerID": "",
                "PDFSettingsforInvoice": {
                    "serial_no_label": "Sr. No.",
                    "report_type": "2",
                    "Status_on_off": 1,
                    "full_pdf": "1",
                    "custom_template": "0",
                    "page_border": 1,
                    "sub_tittle": "1",
                    "generated_by": 1,
                    "supply_type": 1,
                    "generated_date": 1,
                    "valid_date": 1,
                    "cancelled_date": 1,
                    "transp_detail": 1,
                    "cancallation_details": 1,
                    "vehicle_detail": 1,
                    "template_number": "1",
                    "selected_language": "en",
                    "hsn_sac_table": 1,
                    "qr_code": 1,
                    "logo": 1,
                    "Scalling": "2",
                    "Horizontal": "2",
                    "Vertical": "2",
                    "line_description_full_width": 1,
                    "banks_details_pdf": 1,
                    "t_banks_details_pdf": "1",
                    "AmountPaid": 1,
                    "C_Name_PDF": 1,
                    "Accepted_Pay_Method_Position": 1,
                    "invoice_hyperlink": 1,
                    "C_Address": 1,
                    "H_Lines": 1,
                    "shipping_method": 1,
                    "Vat_no_Cust": 1,
                    "append_projectin_invoice": "1",
                    "Contacts_Email": 1,
                    "task_rate": 1,
                    "product_table_image_show": 0,
                    "PDF_Page_Number": 0,
                    "Reg_No": 1,
                    "Terms_Notes_Full_Width": 0,
                    "hide_payment_number": 1,
                    "comman_layout": {
                        "selectedpagemargin": {
                            "left_margin": 30,
                            "right_margin": 30,
                            "top_margin": 30,
                            "bottom_margin": 30
                        },
                        "selectedFillColor": "rgba(211,211,211,1)",
                        "selectedFontColor": "rgba(0,0,0,1)",
                        "selectedboldfontstyle": "/pdf_fonts/arial/arial_bold.txt",
                        "selectedLineColor": "rgba(0,0,0,1)",
                        "selectedFillTextColor": "rgba(0,0,0,1)",
                        "selectedregularfontstyle": "/pdf_fonts/arial/arial_regular.txt"
                    },
                    "T_Termsandcondition": 1,
                    "AmountDue": 1,
                    "C_Phone": 1,
                    "PDF_Page_Number_alignment": 2,
                    "Sign_Date_Format": "1",
                    "Sum_inline_Discount": 1,
                    "Subtotal": 1,
                    "Signature_2": 1,
                    "Include_Outstanding": 0,
                    "task_amount": 1,
                    "Signature_1": 1,
                    "product_name": "1",
                    "C_Mobile": 1,
                    "C_Country": 1,
                    "Reg_No_Alignment_Cust": 1,
                    "Date_format": 1,
                    "str_Header": 1,
                    "S_AddAlignment": 1,
                    "ShippingCost": 1,
                    "item_codes": 1,
                    "Termsandcondition": 1,
                    "serial_no": 1,
                    "compact_mode": 0,
                    "sub_title": 1,
                    "physical_sign_1": "1",
                    "physical_sign_2": 0,
                    "inline_notes": 1,
                    "product_unitprice": 1,
                    "task_name": "1",
                    "TitleAlignment": 0,
                    "Discount": 1,
                    "Total_Amount": 1,
                    "Cust_Home": 1,
                    "Cust_Fax": 1,
                    "ContactFirstLastName": 1,
                    "Company_URL": 1,
                    "tax_summary": 1,
                    "Email_Cont_Alignment": 0,
                    "product_quantity": 1,
                    "Cust_Business": 1,
                    "T_Notes": 1,
                    "Reg_No_Alignment": 0,
                    "Tax_Per_Value": 1,
                    "taxable_amount": 1,
                    "sub_title_alignment": 1,
                    "Accepted_Pay_Method_Show": 1,
                    "C_Email": 1,
                    "Notes": 1,
                    "Cust_Mobile": 1,
                    "product_amount": 1,
                    "rounded_value": "0",
                    "V_Lines": 1,
                    "Due_Date": 1,
                    "product_discount": 1,
                    "Payment_Details_Invoice": 1,
                    "Invoice_Number": 1,
                    "CreditNote_Number_invoice": 0,
                    "invoice_Number_creditnote": 0,
                    // estimate number.
                    "Estimate_Number": "'" + Number(estimate_form.customer_invoice) + "'",
                    "Sales_Number": "1",
                    "PO_Number": "1",
                    "CreditNote_no": "1",
                    "Paypalbtn_alignment": 0,
                    "Mobile_cont_Alignment": 0,
                    "task_quantity": 1,
                    "task_discount": 1,
                    "Total": 1,
                    "Reg_No_Cust": 1,
                    "Po_no": 1,
                    "Vat_no": 1,
                    "template_background": 0,
                    "F_Color": "1",
                    "tax_summary_data": 1,
                    "amount_used": 1,
                    "amount_remains": 1,
                    "B_AddAlignment": 0,
                    "total_hours_quantity": 0,
                    "show_price_with_tax": 2,
                    "allow_minus_value": 0,
                    "Show_Currency_Symbol": 1,
                    "Show_Currency_Code": 0,
                    "Payment_Note": 0,
                    "C_Fax": 1,
                    "show_sac": 1,
                    "show_hsn": 1,
                    "einvoice_ack_date_show": 1,
                    "einvoice_ack_no_show": 1,
                    "einvoice_detail_show": 0,
                    "einvoice_irn_show": 1,
                    "einvoice_qr_code_show": 1,
                    "duplicate_label": "(Original)",
                    "duplicate_label_show": 1,
                    "duplicate_label_font_size": "14",
                    "service_product_order": 1,
                    "tax_amount_column_value": 0,
                    "variant_size": 0,
                    "variant_type": 0,
                    "ReturnOrder": 1,
                    "single_total": 0,
                    "credit_note_apply": 0,
                    "qr_code_align": "1",
                    "serial_imei_pdf": 1,
                    "batch_name_pdf": 1,
                    "exp_date_pdf": 1,
                    "mfg_date_pdf": 1,
                    "num_to_word_show": 1
                },
                "invoice_report": {
                    "transportation_details": {
                        "name": "",
                        "name_label": "Name",
                        "id": "6878EEF5",
                        "id_label": "Transporter ID",
                        "transportation_details_label": "Transporter Details",
                        "style": {
                            "font_size": 10
                        }
                    },
                    "vehicle_details": {
                        "vehicle_details_label": "Vehicle Details",
                        "doc_no_label": "Doc No",
                        "date_label": "Doc Date",
                        "CEWB_no_label": "CEWB No",
                        "from_label": "From",
                        "mode_label": "Mode of Transport",
                        "total_distance_label": "Total Distance",
                        "style": {
                            "font_size": 10
                        },
                        "reason_label": "Reason",
                        "remark_label": "Remark",
                        "vehicle_details": [{
                            "doc_no": "DAEKOKS54",
                            "CEWB_no": "65456465",
                            "date": "",
                            "mode": "",
                            "from": "",
                            "total_distance": "",
                            "reason": "",
                            "remark": "",
                            "vehicle_no": ""
                        }]
                    },
                    "cancellation_details": {
                        "reason": "Duplicate",
                        "reason_label": "Reason",
                        "remark": "",
                        "remark_label": "Remark",
                        "cancellation_details_label": "Cancellation Details",
                        "style": {
                            "font_size": 10
                        }
                    },
                    "pdf_status_image": "",
                    "phone_no_label": "Phone",
                    "company_email_label": "Email",
                    "mobile_no_label": "Mobile Numer",
                    "reg_no_label": "Reg. No",
                    "vat_no_label": "Tax ID",
                    "company_fax_no_label": "Fax No",
                    "hyperlink_image": '',
                    "num_to_word_label": "Total in Words",
                    "currency": "Rupee",
                    "sub_currency": "Paise",
                    "company_name_title_style": {
                        "font_size": 15
                    },
                    // thisis country.
                    "country": "'" + estimate_form.business_country + "'",
                    "phone_no": "",
                    "firstname": "",
                    "flname": "",
                    "lastname": "",

                    // customername.
                    "peoplename": "'" + estimate_form.customer_detail + "'",
                    "invoice_table": {
                        "valid_date_label": "Valid Till",
                        "valid_date": "'" + estimate_form.customer_date + "'",
                        "cancelled_date_label": "",
                        "cancelled_date": "",
                        "generated_date": "",
                        "generated_date_label": "Generated Date",
                        "supply_type_label": "Supply Type",
                        "supply_type": "",
                        "generated_by_label": "Generated By",
                        "generated_by": "'" + estimate_form.customer_detail + "'",
                        "invoice_po_label": "P.O. #",
                        "invoice_number_label": "Invoice #",
                        "invoice_outstanding_label": "Outstanding",
                        "invoice_date": "'" + estimate_form.customer_date + "'",
                        "invoice_total_label": "Total",
                        "invoice_table_style": {
                            "font_size": 10
                        },
                        "invoice_duedate_label": "Due Date",
                        "invoice_outstanding": [{
                            "symbol": "$",
                            "code": "USD",
                            "selectedcurrency": "'" + estimate_form.customer_currency +
                                "'",
                            "ammountdue": "'" + Number(estimate_form["sub_amout_due[]"])
                                ?.[0] || "" + "'"
                        }],
                        "invoice_total": "'" + estimate_form["total_with_tax_and_price[]"]?.[
                            0
                        ] || "" + "'",
                        "invoice_date_label": "Estimate date",
                        "invoice_po_number": "852",
                        "invoice_number": "MTPL001619",
                        "invoice_duedate": "'" + estimate_form.customer_date + "'",
                        "estimate_number_label": "Estimate #"
                    },
                    "notes": {
                        "notes_value_style": {
                            "font_size": 9
                        },
                        "notes_label": "Notes",
                        "notes_value": "",
                        "notes_label_style": {
                            "font_size": 10
                        }
                    },
                    "reg_no": "",

                    //  city 
                    "city": "'" + estimate_form.business_city + "'",
                    "bank_details": {
                        "bank_details_value": "",
                        "bank_details_label": "Bank Details",
                        "bank_details_label_style": {
                            "font_size": 10
                        },
                        "bank_details_value_style": {
                            "font_size": 9
                        }
                    },
                    "pin_code": "",
                    "selected_currency": "₹",
                    "mobile_no": "",

                    // business email.
                    "company_email": "'" + estimate_form.business_email + "'",

                    // business address.
                    "billing_address": {
                        "home_no": "'" + estimate_form.business_address + "'",
                        "billing_address_label_style": {
                            "font_size": 9
                        },
                        "business_no": "",
                        "billing_country": "'" + estimate_form.business_country,
                        "billing_pin_code": "",
                        "billing_address_label": "Estimate To:",
                        "billing_address_customer": "Organization",
                        "firstname": "First Name",
                        "lastname": "Last Name",
                        "contact_email": "'" + estimate_form.business_email + "'",
                        "billing_vat_no": "",
                        "billing_city": "'" + estimate_form.business_city + "'",
                        "billing_mobile_no": "",
                        "full_name": "'" + estimate_form.business_name + "'",
                        "billing_state": "'" + estimate_form.business_state + "'",
                        "billing_street_2": "",
                        "billing_reg_no": "Reg. No  : REG 001",
                        "billing_street_1": "",
                        "fax_no": ""
                    },
                    // billing data.
                    "bill_from_address": {
                        "address_label": "From",
                        "street_1": "'" + estimate_form.billing_street_1 + "'",
                        "street_2": "'" + estimate_form.billing_street_2 + "'",
                        "city": "'" + estimate_form.billing_city + "'",
                        "state": "'" + estimate_form.billing_state + "'",
                        "pin_code": "'" + estimate_form.billing_zip_code + "'",
                        "country": "'" + estimate_form.billing_country + "'",
                        "address_customer": "'" + estimate_form.customer_detail + "'",
                        "address_label_style": {
                            "font_size": 9
                        }
                    },
                    "dispatch_address": {
                        "address_label": "Dispatch From",
                        "street_1": "'" + estimate_form.shipping_street_1 + "'",
                        "street_2": "'" + estimate_form.shipping_street_2 + "'",
                        "city": "'" + estimate_form.shipping_city + "'",
                        "state": "'" + estimate_form.shipping_state + "'",
                        "pin_code": "'" + estimate_form.shipping_zip_code + "'",
                        "country": "'" + estimate_form.shipping_country + "'",
                        "address_customer": "'" + estimate_form.customer_detail + "'",
                        "address_label_style": {
                            "font_size": 9
                        }
                    },
                    "einvoice": "",
                    "invoice_hyperlink": "Created by",
                    "payment_methods": {
                        "payment_method_all_image": [{
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        },
                        {
                            "payment_method_image": ""
                        }
                        ],
                        "paynow_image": "",
                        "paynow_image_link": "",
                        "payment_methods_label": "We accept payment by"
                    },

                    "company_logo": estimate_form.companylogo ? estimate_form.companylogo : "",
                    "company_logo_width": 150,
                    "company_logo_height": 150,
                    "company_logo_size": "Medium",
                    "lang_code": "en-IN",
                    "currency_code": "INR",
                    "payment_table": {
                        "payment_amount_label": "Amount",
                        "payment_number_label": "Payment #",
                        "payment_type_label": "Payment Type",
                        "payment_details_label_style": {
                            "font_size": 11
                        },
                        "payment_data": [{
                            // estimate date.
                            "payment_date": "'" + estimate_form.customer_date + "'",
                            "payment_number": "01",
                            "payment_type": "Stripe",
                            "payment_note": "'" + estimate_form.notes + "'",
                            "payment_amount": "'" + estimate_form[
                                "total_with_tax_and_price[]"]?.[0] || "" + "'"
                        }],
                        "payment_date_label": "Estimate date",
                        "payment_note_label": "Notes",
                        "payment_label_style": {
                            "font_size": 10
                        },
                        "payment_details_label": "Payment Details"
                    },
                    "shipping_method": {
                        "shipping_method_label": "Shipping Method:",
                        "shipping_method": "'" + estimate_form.shipping_method + "'",
                        "shipping_method_label_style": {
                            "font_size": 9
                        }
                    },
                    "task_table": {
                        "task_header_tax": [{
                            "task_header_tax_name": "GST",
                            "task_header_tax_id": "82A4E33B-9598-44BA-A9FF-AA6A77218C01"
                        }],
                        "task_quantity_label": "Quantity",
                        "sac_header": "SAC",
                        "task_rate_label": "Rate",
                        "task_data": [estimate_form['task_name[]']].flat().map((name, i) => {
                            let taskname = [estimate_form["task_name[]"]].flat()[i] ||
                                "";
                            let taxamount = Number([estimate_form["tasktaxrate[]"]]
                                .flat()[i]) ||
                                1;
                            let taskamount = Number([estimate_form["task_rate[]"]]
                                .flat()[i]) ||
                                1;
                            let taskquantity = Number([estimate_form["task_quantity[]"]]
                                .flat()[
                                i
                            ]) || 1;
                            let taskdesc = [estimate_form["task_description[]"]].flat()[
                                i] || "";
                            let tasktaxperunit = Number([estimate_form["tasktaxrate[]"]]
                                .flat()[
                                i
                            ]) || 1;
                            // 3. LOGIC: Calculate amount (Rate * Qty)
                            // const totalAmount = tRate * tQty;

                            return {
                                "task_name": taskname,
                                "task_project": taskname,
                                "task_unit": "",
                                "task_discount": "5%",
                                "task_used_tax": [{
                                    "tax_name": "GST",
                                    "tax_amount": taxamount,
                                    "tax_rate": taxamount,
                                    "tax_types": "%",
                                    "tax_id": "82A4E33B-9598-44BA-A9FF-AA6A77218C01"
                                }],
                                "task_amount": taskamount,
                                "task_rate": taskamount,
                                "task_quantity": taskquantity,
                                "sac_value": "SAC0001",
                                "task_inline_note": taskdesc,
                                "task_inline_date": "",
                                "task_tax_per_unit": tasktaxperunit,
                                "task_tax_total": tasktaxperunit
                            }
                        }),


                        "task_table_style": {
                            "font_size": 10
                        },
                        "task_name_label": "Services",
                        "task_amount_label": "Amount",
                        "task_discount_label": "Discount",
                        "task_inline_note_style": {
                            "font_size": 9
                        }
                    },
                    "company_detail_style": {
                        "font_size": 9
                    },
                    "state": "'" + estimate_form.business_state + "'",
                    // shipping data.
                    "shipping_address": {
                        "shipping_address_customer": "'" + estimate_form.customer_detail + "'",
                        "shipping_state": "'" + estimate_form.shipping_state + "'",
                        "shipping_pin_code": "'" + estimate_form.shipping_zip_code + "'",
                        "shipping_country": "'" + estimate_form.shipping_country + "'",
                        "shipping_city": "'" + estimate_form.shipping_city + "'",
                        "shipping_street_2": "'" + estimate_form.shipping_street_2 + "'",
                        "shipping_street_1": "'" + estimate_form.shipping_street_1 + "'",
                        "shipping_address_label_style": {
                            "font_size": 9
                        },
                        "shipping_address_label": "Ship To:"
                    },
                    // businessname
                    "company_name_title": "'" + estimate_form.business_name + "'",
                    "product_table": {
                        "product_name_label": "Products",
                        "product_inline_note_style": {
                            "font_size": 9
                        },
                        "product_quantity_label": "Quantity",
                        "hsn_header": "HSN",
                        "product_amount_label": "Amount",
                        "product_serial_no_label": "Serial/IMEI",

                        "product_data": [estimate_form["product_name[]"]].flat().map((name,
                            i) => {
                            // 1. Capture the values from parallel arrays using index [i]
                            // We use Number() to ensure calculations work, and || 0 as a fallback
                            const qty = Number([estimate_form["quantity[]"]].flat()[
                                i] || 0);
                            const total = Number([estimate_form["product_total[]"]]
                                .flat()[i] ||
                                0);
                            const taxTotal = Number([estimate_form["producttaxrate[]"]]
                                .flat()[
                                i
                            ] || 0);
                            const itemCode = [estimate_form["product_id[]"]].flat() ? [
                                estimate_form["product_id[]"]
                            ].flat()[i] : "";
                            const description = [estimate_form["product_description[]"]]
                                .flat()[
                                i
                            ] || "";

                            // 2. Calculate Unit Price (Total / Quantity)
                            const unitPrice = qty > 0 ? (total / qty).toFixed(2) :
                                "0.00";

                            // 3. Return the row object
                            return {
                                "product_name": name,
                                "product_item_code": itemCode,
                                "hsn_value": "HSN0001",
                                "serial_no_value": "AB01,AB02",
                                "product_quantity": qty.toString(),
                                "product_unit": "",
                                "product_unitprice": unitPrice,
                                "product_discount": "5",
                                "product_image": "",
                                "product_used_tax": [{
                                    "tax_name": estimate_form[
                                        "producttaxname[]"][i] || "GST",
                                    "tax_amount": taxTotal,
                                    "tax_id": "82A4E33B-9598-44BA-A9FF-AA6A77218C01",
                                    "tax_rate": taxTotal.toString(),
                                    "tax_types": "%"
                                }],
                                "product_amount": total.toString(),
                                "product_with_tax_amount": (total + taxTotal)
                                    .toString(),
                                "product_without_tax_amount": total.toString(),
                                "product_inline_note": description,
                                "product_tax_per_unit": null,
                                "product_tax_total": taxTotal
                            };
                        }),

                        "product_unitprice_label": "Unit Price",
                        "product_discount_label": "Discount",
                        "variant_size_header": "Variant Size",
                        "variant_type_header": "Variant Type",
                        "product_table_style": {
                            "font_size": 10
                        },
                        "product_header_tax": [{
                            "product_header_tax_name": "GST",
                            "product_header_tax_id": "82A4E33B-9598-44BA-A9FF-AA6A77218C01"
                        }]

                    },
                    "website": "sonyphotos.com",
                    "sub_title": {
                        "sub_title_style": {
                            "font_size": 10
                        },
                        "sub_title_label": "Moon Invoice - Easy Invoicing"
                    },
                    "table_cal": {
                        "qty_label": "Qty",
                        "deposit_label": "Deposit",
                        "amountpaid_value": "100",
                        "task_quantity_label": "Quantity",
                        "total_cost_label": "Total",
                        "amountdue_label": "Amount Due",
                        "depositdue_label": "Deposit Due",
                        "total_inlinediscount_value": 11,
                        "discount_value": 1,
                        "shipping_cost_value": `' ${estimate_form.shipping_cost ?? 0}'`,
                        "rounded_total_label": "Rounded Total",
                        "rounded_total_remain_label": "Round Off",
                        "rounded_amount": 0,
                        "sub_total_value": `'${estimate_form["sub_total[]"] ?? 0}'`,
                        "deposit_ratio": "20",
                        "discount_ratio": "10.0000%",
                        "amountdue_value": `' ${estimate_form["sub_amout_due[]"] ?? 0}'`,
                        "discount_on_value": `' ${estimate_form["total_with_tax_and_price[]"] ?? 0}'`,
                        "discount_on_header": "on",
                        "depositdue_value": 0,
                        "deposit_value": 0,
                        "amountpaid_label": "Amount Paid",
                        "single_total_label": "Total Quantity",
                        "return_order_label": "Return Order",
                        "return_order_value": 1500,
                        "table_cal_style": {
                            "font_size": 9
                        },
                        "sub_total_label": "Sub Total",
                        "total_inlinediscount_label": "Inline Discount",
                        "tax_detail": [{
                            "tax_id": "82A4E33B-9598-44BA-A9FF-AA6A77218C01",
                            "tax_name": "GST",
                            "tax_data": "5%",
                            "tax_value": 13.5,
                            "tax_on_header": "on",
                            "tax_on_value": 270
                        }],
                        "discount_label": "Discount",
                        "total_cost_value": "", // estimate_form.shipping_cost,
                        "shipping_cost_label": "Shipping Cost"
                    },
                    "invoice_report_title": page_name,
                    "terms_condition": {
                        "terms_condition_label_style": {
                            "font_size": 10
                        },
                        "terms_condition_label": "Terms & Conditions",
                        "terms_condition_value_style": {
                            "font_size": 9
                        },
                        "terms_condition": "'" + estimate_form.terms_codition + "'"
                    },
                    "mindecimaldigit": 2,
                    "background_image_height": 0,
                    "background_image": "https://www.mooninvoice.com/public/pdf_template/default.png",
                    "maxdecimaldigit": 2,
                    "street_1": "",
                    "street_2": "",
                    "Signature": {
                        "Signature_2_image": "",
                        "Signature_1_image": "",
                        "Signature_2_alignment": "2",
                        "Signature_1_alignment": "0",
                        "Signature_2_title": "",
                        "Signature_1_title": "",
                        "physical_sign_1_name": "",
                        "physical_sign_2_name": "",
                        "Signature_1_date": "",
                        "Signature_2_name": "",
                        "Signature_2_date": "",
                        "Signature_1_name": "",
                        "Signature_width": 100,
                        "Signature_height": 100,
                        "Signature_size": "Small"
                    },
                    "invoice_report_title_style": {
                        "font_size": 18
                    },
                    "vat_no": "",
                    "company_fax_no": "",
                    "hsn_sac_table": {
                        "hsnsac_label": "",
                        "taxable_value_label": "",
                        "central_tax_label": "",
                        "state_tax_label": "x",
                        "rate_label": "",
                        "amount_label": "",
                        "hsnsac_label_style": {
                            "font_size": 9
                        },
                        "total_tax_amount_label": "",
                        "hsnsac_data": [{
                            "hsnsac_value": "1115542",
                            "taxable_value_value": 100,
                            "s_rate_value": "9%",
                            "s_amount_value": 9,
                            "c_rate_value": "",
                            "c_amount_value": "",
                            "total_tax_amount_value": 9
                        }],
                        "total_label": "Total",
                        "total_tax": 9,
                        "total_c_tax": 0,
                        "total_s_tax": 9,
                        "total_taxable": 100
                    },
                    "qr_code": "",
                    "Signature_width": 100,
                    "Signature_height": 100,
                    "Signature_size": "Small"
                },
                "service_type": "'" + estimate_form.service_type + "'",
                "platform": "web",
                "Scalling": "2",
                "Horizontal": "2",
                "Vertical": "2"
            }



            const jsonString = JSON.stringify(data);

            // convert json to base64 safely without spread operator.
            const utf8Bytes = new TextEncoder().encode(jsonString);
            let binaryString = "";
            for (let i = 0; i < utf8Bytes.length; i++) {
                binaryString += String.fromCharCode(utf8Bytes[i]);
            }
            const base64Data = btoa(binaryString);
            console.log("Base64 string generated safely.");
            // console.log(base64Data);
            // const parse_data = JSON.parse(localStorage.getItem('estimate_form'));







            // we have base64 now we have to call only nodepdfpreview api with this base64 data.
            fetch("https://betaapp.mooninvoice.com/live_webapp/node_pdf_preivew", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "is_json_type": true,
                    "json_Data": base64Data
                })
            })
                // error comes here,... 
                // .then(res => res.json()) // 1. Read the response as JSON text
                .then(res => {
                    if (!res.ok) throw new Error("Network response was not ok");
                    return res.json(); // Correctly returning the promise
                })
                .then(response => {
                    // 2. Extract the Base64 string from the "base" key
                    // We split at the comma to remove "data:application/pdf;base64,"
                    // console.log(response);


                    // Check if the server actually returned the PDF data
                    if (response.data && response.data.base) {
                        const base64String = response.data.base.split(',')[1];



                        // 3. Convert that Base64 string into a binary Blob
                        const byteCharacters = atob(base64String);
                        const byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        const pdfBlob = new Blob([byteArray], {
                            type: 'application/pdf'
                        });

                        // 4. Create a local URL for the PDF
                        const pdfUrl = URL.createObjectURL(pdfBlob);
                        openPreview(pdfUrl);
                        window.pdfContent = pdfUrl;


                    } else {
                        // This handles your "Invoice not found" case
                        console.error("API Error Message:", response.message);
                        alert("Error: " + response.message);
                    }

                })
                .catch(err => {
                    console.error("Failed to process PDF:", err);
                    alert("Could not generate PDF. Check console for details.");
                });


        }
    });
    // */

    $(".add_product").on('click', function (e) {
        e.preventDefault();
        counter++;
        table_tr++;


        let text_box = '<tr class="instant_invoice_detail remove_row" id="delete_item_' + counter +
            '"><input type="hidden" name="product_id["' + (counter) +
            '"]"><td class="color_black product_count">' + (table_tr) +
            '</td><td><div><span class="color_black mb_2"><input type="text" placeholder="Product" name="product_name[]" maxlength="255" data-value="" class="w-100 product_name input-px-10"></span><span class="color_light"><textarea name="product_description[]" id="" placeholder="Description" class="w-100 product_description input-px-10" cols="85" rows="2"></textarea></span></div></td>' +

            '<td class="color_light text_right"><input type="number" placeholder="Quantity" data-value="1" data-action="productQuantity" name="quantity[]" id="product_quantity_' +
            counter + '" for="' + counter +
            '" value="1" min="1" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="5" class="max_70 product_quantity"></td>' +

            '<td class="color_light text_right"><input type="number" placeholder="Rate" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="10" for="' +
            counter + '" name="rate[]" id="product_price_' + counter +
            '" min="0" data-action="productRate" data-value="" class="max_70 product_price"></td>' +

            // ✅ Added GST Name
            '<td class="color_light text_right">' +
            '<input type="text" placeholder="GST" name="producttaxname[]" id="product_tax_name_' +
            counter +
            '" maxlength="255" data-action="productTaxName" data-value="" class="max_70 product_tax_name">' +
            '</td>' +

            // ✅ Added Tax Rate
            '<td class="color_light text_right">' +
            '<input type="number" placeholder="Tax%" maxlength="10" for="' + counter +
            '" name="producttaxrate[]" id="product_tax_rate_' + counter +
            '" min="0" data-action="productTaxRate" data-value="" ' +
            'oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" ' +
            'class="max_70 product_tax_rate">' +
            '</td>' +

            '<td class="color_light text_right"><span class="add_symbol"></span> ' +
            '<span class="max_70 product_total" id="product_total_' +
            counter + '">0</span>' +

            '<a href="javascript:void(0);" for="' + counter +
            '" id="item_remove" class="delete_item">' +
            '<span class="fa fa-trash"></span></a>' +

            '<input type="hidden" name="product_total[]" class="product_total1_' +
            counter + '" id="product_total1_' + counter +
            '" value="" data-value="">' +

            '</td></tr>';

        $('#invoice_list').append(text_box);
        if (default_currecy != '') {
            $('.add_symbol').text($("#customer_currency").find(':selected').data('symbol'));
        } else {
            // console.log('default22:' + default_currecy);
        }
        return false;
    });


    $(".add_task").on('click', function (e) {
        e.preventDefault();
        counter++;
        table_tr++;

        // Backup task description
        // <input type="text" placeholder="Description" maxlength="255" data-value="" onkeypress="return /^[a-zA-Z0-9 ]+$/i.test(event.key)" name="task_description[]" class="w-100 task_description">
        let text_box = '<tr class="instant_invoice_detail remove_row" id="delete_item_' + counter +
            '"><input type="hidden" name="product_id["' + (counter) +
            '"]"><td class="color_black product_count">' + (table_tr) +
            '</td><td><div><span class="color_black mb_2"><input type="text" placeholder="Task" name="task_name[]" maxlength="255" data-value="" class="w-100 task_name input-px-10"></span><span class="color_light"><textarea name="task_description[]" placeholder="Description" class="w-100 task_description input-px-10" cols="85" rows="2"></textarea></span></div></td>' +

            '<td class="color_light text_right"><input type="number" placeholder="Quantity" data-value="1" data-action="productQuantity" name="task_quantity[]" for="' +
            counter + '" id="task_quantity_' + counter +
            '" value="1" min="1" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="5" class="max_70 task_quantity"></td>' +

            '<td class="color_light text_right"><input type="number" for="' +
            counter + '" id="task_price_' + counter +
            '" placeholder="Rate" name="task_rate[]" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="10" min="0" data-value="" data-action="productRate" value="" class="max_70 task_price"></td>' +

            // ✅ Added GST Name
            '<td class="color_light text_right">' +
            '<input type="text" placeholder="GST" name="tasktaxname[]" id="task_tax_name_' +
            counter +
            '" maxlength="255" data-action="taskTaxName" data-value="" class="max_70 task_tax_name">' +
            '</td>' +

            // ✅ Added Tax %
            '<td class="color_light text_right">' +
            '<input type="number" placeholder="Tax%" maxlength="10" for="' + counter +
            '" name="tasktaxrate[]" id="task_tax_rate_' + counter +
            '" min="0" data-action="taskTaxRate" data-value="" ' +
            'oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" ' +
            'class="max_70 task_tax_rate">' +
            '</td>' +

            '<td class="color_light text_right"><span class="add_symbol"></span> ' +
            '<span class="max_70 task_total_' +
            counter + ' product_total" id="product_total_' + counter +
            '">0</span>' +

            '<a href="javascript:void(0);" for="' + counter +
            '" id="item_remove" class="delete_item"><span class="fa fa-trash"></span></a>' +

            '<input type="hidden" name="task_total[]" class="task_total1_' +
            counter + '" value="" data-value="">' +

            '</td></tr>';

        $("#invoice_list").append(text_box);
        if (default_currecy != '') {
            $('.add_symbol').text($("#customer_currency").find(':selected').data('symbol'));
        } else {
            $('.add_symbol').html("$");
        }
        return false;
    });

    check = function (e, value) {
        if (!e.target.validity.valid) {
            e.target.value = value.substring(0, value.length - 1);
            return false;
        }
        var idx = value.indexOf('.');
        if (idx >= 0) {
            if (value.length - idx > 3) {
                e.target.value = value.substring(0, value.length - 1);
                return false;
            }
        }
        return true;
    }
});



$("#invoice_signup_form").on('input',
    'input.product_price,input.product_quantity,input.product_tax_rate,input.product_tax_name,input.task_tax_rate,input.task_tax_name,input.shipping_cost,input.single_tax,input.task_quantity,input.task_price',
    function (e) {
        e.stopPropagation();
        getTotalCost($(this).attr("for"));
    });


let price_n = '';
let tax_n = '';

function getNum(val) {
    val = parseFloat(val);
    return isNaN(val) ? 0 : val;
}

function getTotalCost(ind) {
    /* ---------- PRODUCT ---------- */

    var qty = getNum($('#product_quantity_' + ind).val());
    var price = getNum($('#product_price_' + ind).val());

    var baseProductTotal = qty * price;

    var productTaxName = $("#product_tax_name_" + ind).val();
    var productTaxRate = getNum($("#product_tax_rate_" + ind).val());

    var productTaxAmount = 0;

    if (productTaxName && productTaxRate > 0) {
        productTaxAmount = (baseProductTotal * productTaxRate) / 100;
    }

    var finalProductTotal = baseProductTotal + productTaxAmount;

    $('#product_total_' + ind).html(finalProductTotal.toFixed(2));
    $(".product_total1_" + ind).val(finalProductTotal);


    /* ---------- TASK ---------- */

    var taskQty = getNum($("#task_quantity_" + ind).val());
    var taskPrice = getNum($("#task_price_" + ind).val());

    var baseTaskTotal = taskQty * taskPrice;

    var taskTaxName = $("#task_tax_name_" + ind).val();
    var taskTaxRate = getNum($("#task_tax_rate_" + ind).val());

    var taskTaxAmount = 0;

    if (taskTaxName && taskTaxRate > 0) {
        taskTaxAmount = (baseTaskTotal * taskTaxRate) / 100;
    }

    var finalTaskTotal = baseTaskTotal + taskTaxAmount;

    $(".task_total_" + ind).html(finalTaskTotal.toFixed(2));
    $(".task_total1_" + ind).val(finalTaskTotal);


    /* ---------- SUBTOTAL (WITHOUT TAX) ---------- */

    var subtotal = 0;

    $(".product_price").each(function () {
        var row = $(this).attr("for");

        subtotal +=
            getNum($("#product_quantity_" + row).val()) *
            getNum($("#product_price_" + row).val());
    });

    $(".task_price").each(function () {
        var row = $(this).attr("for");

        subtotal +=
            getNum($("#task_quantity_" + row).val()) *
            getNum($("#task_price_" + row).val());
    });

    $('.sub_total').html(subtotal.toFixed(2));
    $('.sub_total1').val(subtotal);


    /* ---------- TOTAL TAX ---------- */

    var totalTax = 0;


    // PRODUCT TAX LOOP
    $(".product_tax_rate").each(function () {
        var row = $(this).attr("for");

        var taxName = $("#product_tax_name_" + row).val();
        var taxRate = getNum($(this).val());

        if (taxName && taxRate > 0) {
            var base =
                getNum($("#product_quantity_" + row).val()) *
                getNum($("#product_price_" + row).val());

            totalTax += (base * taxRate) / 100;
        }
    });


    // TASK TAX LOOP
    $(".task_tax_rate").each(function () {
        var row = $(this).attr("for");

        var taxName = $("#task_tax_name_" + row).val();
        var taxRate = getNum($(this).val());

        if (taxName && taxRate > 0) {
            var base =
                getNum($("#task_quantity_" + row).val()) *
                getNum($("#task_price_" + row).val());

            totalTax += (base * taxRate) / 100;
        }
    });


    /* ---------- TAX BREAKDOWN UI ---------- */

    $(".tax_breakdown_row").remove();


    // remove old rows first
    $(".tax_breakdown_row").remove();

    var taxSummary = {};
    var currencySymbol = $("#customer_currency").find(':selected').data('symbol');

    // helper function to process tax rows
    function processTax(selector, type) {
        $(selector).each(function () {
            var row = $(this).attr("for");

            var taxName = $("#" + type + "_tax_name_" + row).val();
            var taxRate = getNum($(this).val());

            var base =
                getNum($("#" + type + "_quantity_" + row).val()) *
                getNum($("#" + type + "_price_" + row).val());

            if (taxName && taxRate > 0 && base > 0) {
                var taxAmount = (base * taxRate) / 100;

                var key = taxName + "_" + taxRate;

                if (!taxSummary[key]) {
                    taxSummary[key] = {
                        taxName: taxName,
                        taxRate: taxRate,
                        base: 0,
                        taxAmount: 0
                    };
                }

                taxSummary[key].base += base;
                taxSummary[key].taxAmount += taxAmount;
            }
        });
    }

    // process both
    processTax(".product_tax_rate", "product");
    processTax(".task_tax_rate", "task");

    // render merged result
    $.each(taxSummary, function (key, tax) {
        $(".new_subtotal_div").after(`
                        <div class="d-flex flex_wrap flex_between wrap_div tax_breakdown_row">
                            <span class="color_primary_new font_14">
                                ${tax.taxRate}% ${tax.taxName} on 
                                <span class="add_symbol">${currencySymbol}</span>${tax.base.toFixed(2)}
                            </span>
                            <span class="color_primary_new font_14">
                                <span class="add_symbol">${currencySymbol}</span>${tax.taxAmount.toFixed(2)}
                            </span>
                        </div>
                    `);
    });

    /* ---------- UPDATE TAX ---------- */

    $(".inline_taxes").html(totalTax.toFixed(2));
    $(".inline_taxes1").val(totalTax);


    /* ---------- FINAL TOTAL ---------- */

    var shipping_cost = getNum($("#shipping_cost").val());

    $('.shipping_cost_label').html(shipping_cost.toFixed(2));
    $('.shipping_cost_label1').val(shipping_cost);

    var finalTotal = subtotal + totalTax + shipping_cost;

    $('.total_with_tax_and_price').html(finalTotal.toFixed(2));
    $('.total_with_tax_and_price1').val(finalTotal);

    $('.sub_amout_due').html(finalTotal.toFixed(2));
    $('.sub_amout_due1').val(finalTotal);
}



// Business Address
$('.same_as_billing_address').on('click', function (e) {

    var chk = e.target.checked;
    if (chk == true) {
        $("#shipping_address").val($("#biling_address").val());
        $("#shipping_street_1").val($("#billing_street_1").val());
        $("#shipping_street_2").val($("#billing_street_2").val());
        $("#shipping_city").val($("#billing_city").val());
        $("#shipping_state").val($("#billing_state").val());
        $("#shipping_zip_code").val($("#billing_zip_code").val());
        $("#shipping_country").val($("#billing_country").val());
    } else {
        $("#shipping_address").val("");
        $("#shipping_street_1").val("");
        $("#shipping_street_2").val("");
        $("#shipping_city").val("");
        $("#shipping_state").val("");
        $("#shipping_zip_code").val("");
        $("#shipping_country").val("");
    }
});

$("#invoice_email").on('click', function () {
    // $("#uniquePreviewBackdrop").first().trigger('click');
    // openPreview("http://miwebsite.localhost.com/resources/js/Invoice.pdf");

});
window.onload = function () { }




// ---------------------------------------------------------------
// model preview and print pdf .....
// ---------------------------------------------------------------


function openPreview(pdfUrl) {
    currentPdfUrl = pdfUrl;

    const backdrop = document.getElementById('uniquePreviewBackdrop');
    backdrop.style.display = 'flex';

    const pdfjsLib = window['pdfjsLib'];
    pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
        pdf.getPage(1).then(page => {

            const canvas = document.getElementById('pdfCanvas');
            const context = canvas.getContext('2d');
            const container = document.querySelector('.pdf-scroll-container');

            const viewport = page.getViewport({
                scale: 1
            });

            const scale = container.clientWidth / viewport.width;
            const scaledViewport = page.getViewport({
                scale
            });

            canvas.width = scaledViewport.width;
            canvas.height = scaledViewport.height;

            page.render({
                canvasContext: context,
                viewport: scaledViewport
            });
        });
    });
}



function closePreview() {
    document.getElementById('uniquePreviewBackdrop').style.display = 'none';
}


function printPDF() {
    const canvas = document.getElementById('pdfCanvas');
    if (!canvas) {
        console.error("Canvas not found");
        return;
    }

    // 1. Convert canvas to Image
    const dataUrl = canvas.toDataURL('image/png');

    // 2. Create a hidden iframe
    let printFrame = document.getElementById('print-helper-frame');
    if (!printFrame) {
        printFrame = document.createElement('iframe');
        printFrame.id = 'print-helper-frame';
        printFrame.style.display = 'none'; // Keep it hidden
        document.body.appendChild(printFrame);
    }

    // 3. Write content to the iframe
    const doc = printFrame.contentWindow.document;
    doc.open();
    doc.write(`
                        <html>
                            <body style="margin:0;">
                                <img src="${dataUrl}" style="width:100%;" onload="window.print();">
                            </body>
                        </html>
                    `);
    doc.close();

    // 4. Optional: Remove the iframe after printing
    printFrame.contentWindow.onafterprint = () => {
        document.body.removeChild(printFrame);
    };
}



//-------------------------------------------------
// download and print pdf code..
//-------------------------------------------------
function validateField(field) {
    let isValid = true;

    if (field === 'name' || field === 'all') {
        const name = $('#name').val().trim();
        const $group = $('#nameGroup');
        if (!name) {
            $group.addClass('error');
            isValid = false;
        } else {
            $group.removeClass('error');
        }
    }

    if (field === 'email' || field === 'all') {
        const email = $('#email').val().trim();
        const $group = $('#emailGroup');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            $group.addClass('error');
            $group.find('.login-error-message').text('Email is required.');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            $group.addClass('error');
            $group.find('.login-error-message').text('Please enter a valid email.');
            isValid = false;
        } else {
            $group.removeClass('error');
        }
    }

    if (field === 'phone' || field === 'all') {
        const phone = $('#phone').val().trim();
        const $group = $('#phoneGroup');
        if (!phone) {
            $group.addClass('error');
            isValid = false;
        } else {
            $group.removeClass('error');
        }
    }

    if (field === 'jobRole' || field === 'all') {
        const jobRole = $('#jobRoleValue').text().trim();
        const $group = $('#jobRoleGroup');
        if (!jobRole) {
            $group.addClass('error');
            isValid = false;
        } else {
            $group.removeClass('error');
        }
    }

    return isValid;
}

$(document).ready(function () {
    // Remove default error classes on page load
    $('.login-input-groups.error, .download-modal-field.error').removeClass('error');

    // Attach blur events
    $('#name').on('blur', function () {
        validateField('name');
    });

    // Job Role Selection Handler
    $('.download-modal-option').on('click', function () {
        const val = $(this).data('value');
        const text = $(this).text();
        $('#jobRoleValue').text(text);
        $('#jobRoleInput').val(val);
        $('#jobRolePanel').hide();
        validateField('jobRole');
    });

    $('#jobRoleTrigger').on('click', function (e) {
        e.stopPropagation();
        $('#jobRolePanel').toggle();
    });

    $(document).on('click', function () {
        $('#jobRolePanel').hide();
    });


    // Handle submission
    $('#downloadForm').on('submit', function (e) {
        e.preventDefault();

        const $btn = $('#downloadModalBtn');
        const action = $btn.attr('data-action');

        if (validateField('all')) {
            const originalText = $btn.text();
            $btn.text('Processing...').prop('disabled', true);

            const formData = {
                name: $('#name').val().trim(),
                email: $('#email').val().trim(),
                phone: $('#phone').val().trim(),
                designation: $('#jobRoleValue').text().trim(),
                medium: "{{ $page_name }}"
            };

            const jsonString = JSON.stringify(formData);
            const base64Data = btoa(unescape(encodeURIComponent(jsonString)));
            $('#encoded_data').val(base64Data);

            $.ajax({
                url: $(this).attr('action'),
                type: "POST",
                data: {
                    _token: "{{ csrf_token() }}",
                    request: $('#encoded_data').val()
                },
                success: function (response) {
                    $btn.text(originalText).prop('disabled', false);

                    let res = typeof response === 'string' ? JSON.parse(response) :
                        response;

                    if (res.status == 200) {
                        // Set submission flags
                        localStorage.setItem('user_submit', 'true');
                        window.user_submitted = true;

                        // Close modal
                        $('.download-modal-overlay').removeClass('active');
                        $('body').css({
                            overflow: '',
                            paddingRight: ''
                        });

                        // Perform the document action (using centralized function in freetoolsave.js)
                        if (typeof performDocumentAction === 'function') {
                            performDocumentAction(action);
                        }
                    } else {
                        alert(res.message ||
                            'Validation failed. Please check your inputs.');
                    }

                },
                error: function (xhr) {
                    $btn.text(originalText).prop('disabled', false);
                    console.error('Error submitting form data:', xhr.responseText);
                    alert('Something went wrong. Please try again.');
                }
            });
        }
    });

});

