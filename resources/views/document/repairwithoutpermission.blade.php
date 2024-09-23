<!DOCTYPE html>
<html>

<head>
    <style>
        @font-face {
            font-family: 'Arial';
            font-weight: normal;
            font-style: normal;
            font-variant: normal;
        }

        * {
            font-size: 100%;
            font-size: 14px;
            padding-left: 2.22%;
            padding-right: 2.22%;

        }

        #tableborder {
            border: 1px solid black;
            border-collapse: collapse;
            text-align: center;
        }

        #test {
            background-image: url('/images/icon-512.webp');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        }

        header {
            position: fixed;
            top: 0;
            left: 0;
            z-index: -1000;
            float: right;
            opacity: 0.5;
        }

        footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            float: center;
        }

        body {
            font-family: 'Arial', sans-serif;
        }

        .watermark {
            position: fixed;
            left: -150;
            /* width:    8cm;
    height:   8cm; */
            z-index: -1000;
        }

        b {
            padding: 0;
        }
    </style>
</head>

<header>
    <img src="data:image/png;base64,{{ base64_encode(file_get_contents(public_path('/images/logoblack.png'))) }}" width="150" style="float: right; opacity: 1;">
</header>

<footer>
    <div class="u-clearfix u-sheet u-sheet-1">
        <center>
            <p class="u-small-text u-text u-text-variant u-text-1" style="color: grey; padding-bottom:0px"><i>This is a computer-generated document. No signature is required.</i><br>
                <b style="color:grey; font-size:12px; padding-top:0px">EZCARE WARRANTY SDN BHD (1213936-K)</b><br>
                <span style="color:grey; font-size:12px">NO 1A &amp; 3A, JALAN 8/1, SEKSYEN 8, 43650 BANDAR BARU BANGI, SELANGOR.</span><br>
                <a href="mailto:info@ezcare-warranty.com" class="u-active-none u-border-none u-btn u-button-style u-hover-none u-none u-text-palette-1-base u-btn-1">info@ezcare-warranty.com</a>
            </p>
        </center>
    </div>
</footer>

<!-- content start -->
<div class="watermark">
    <img src="data:image/png;base64,{{ base64_encode(file_get_contents(public_path('/images/icon-512.webp'))) }}" width="1000" style="float: center; opacity: 0.2;">
</div>

<body>
    <main>
        <br>
        <div id="test" class="u-clearfix u-sheet u-sheet-1">
            <p class="u-text u-text-default u-text-1"> {{ $currentdatetime }}</p>
            <p style="padding-bottom:0;margin-bottom:0;"><b>{{ Str::upper($customer->first_name) }}&nbsp;{{ Str::upper($customer->last_name) }}</b></p>
            <p class="u-text u-text-3" style="padding-bottom:0;margin-bottom:0;padding-top:0;margin-top:0;"> {{ Str::upper($customer->mainAddress->line1) }},
                &nbsp;<br>{{ Str::upper($customer->mainAddress->line2) }},
                &nbsp;<br>{{ $customer->mainAddress->postcode }} 
                {{ Str::upper($customer->mainAddress->state) }},
            </p>
            <p style="float : left;margin-top:0;">{{ Str::upper($customer->mainAddress->city) }}</p>
            <p style="padding-top:0; margin-top:0;text-align : right; padding-bottom:2%"><b style="padding-top:0; margin-top:0;"><i style="padding-right:0; padding-top:0; margin-top:0;">WITHOUT PREJUDICE</i></b></p>
            
            <p class="u-text u-text-5" style="justify-content: center;text-align: justify;">
                <u><b>NOTICE OF CLAIM DENIAL AND POLICY TERMINATION FOR {{ Str::upper($vehicle->brand->name) }} {{ Str::upper($vehicle->model->name) }} ({{ $policy->vehicle->registration_no }})</b></u>
            </p>
            <p style="justify-content: center;text-align: justify;">
                Dear Policyholder,
            </p>
            <p style="justify-content: center;text-align: justify;">
                Referring to the above matter, we regret to inform upon reviewing your recent warranty claim, we have <b>DENIED</b> the claim for the following vehicle:
            </p>

            <div class="row">
                <table style="width:70%; border: none;margin-left: auto;margin-right: auto;">
                    <tr>
                        <td>POLICY NO</td>
                        <td>:</td>
                        <td>{{ strtoupper($policy->policy_no) }}</td>
                    </tr>
                    <tr>
                        <td>MODEL</td>
                        <td>:</td>
                        <td>{{ Str::upper($vehicle->brand->name) }} {{ Str::upper($vehicle->model->name) }}</td>
                    </tr>
                    <tr>
                        <td>YEAR</td>
                        <td>:</td>
                        <td>{{ $policy->vehicle->year }}</td>
                    </tr>
                    <tr>
                        <td>CHASIS NO</td>
                        <td>:</td>
                        <td>{{ $policy->vehicle->chassis_no }}</td>
                    </tr>
                    <tr>
                        <td>ENGINE NO</td>
                        <td>:</td>
                        <td>{{ $policy->vehicle->engine_no }}</td>
                    </tr>
                    <tr>
                        <td>DEALER</td>
                        <td>:</td>
                        <td>{{ $policy->dealer->name }}</td>
                    </tr>
                </table>
            </div>

            <p style="justify-content: center;text-align: justify;"> This is due to the vehicle repair undertaken <b>without prior approval</b> from Ezcare Warranty. As per the terms and conditions outlined in the warranty e-policy, any repairs on the vehicle during the warranty period must receive provisional authorisation/approval from us.&nbsp;</p>
            <p style="justify-content: center;text-align: justify;"> Upon review of the circumstances surrounding the repair carried out on your vehicle, it has come to our attention that the repair was executed without seeking prior approval from Ezcare Warranty. &nbsp;</p>
            <p style="justify-content: center;text-align: justify;">Regrettably, as a result of this violation, we are compelled to deny the claim. Furthermore, under the terms and conditions, we are obligated to <b>TERMINATE</b> your policy with immediate effect.&nbsp;</p>
            <p style="justify-content: center;text-align: justify;">For further information, please refer to the warranty e-policy <b>TERMS & CONDITIONS</b> available in the mobile app.&nbsp;</p>

            <p class="u-align-justify u-text u-text-12"> Thank you and your cooperation is highly appreciated.</p>
            <br><br>
            <p class="u-align-justify u-text u-text-13"><b>CLAIM DEPARTMENT</b></p>
            <br>

        </div>
    </main>
</body>

</html>