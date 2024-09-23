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
            <p><b>{{ Str::upper($customer->first_name) }}&nbsp;{{ Str::upper($customer->last_name) }}</b></p>
            <p class="u-text u-text-3"> {{ Str::upper($customer->mainAddress->line1) }},&nbsp;<br>{{ Str::upper($customer->mainAddress->line2) }},&nbsp;<br>{{ $customer->mainAddress->postcode }} {{ Str::upper($customer->mainAddress->state) }},&nbsp;<br>{{ Str::upper($customer->mainAddress->city) }}</p>
            <p class="u-text u-text-4"> Dear Policyholder, &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <b><i>WITHOUT PREJUDICE</i></b>
            </p>
            <p class="u-text u-text-5">
                <u><b>NOTICE OF APPROVAL FOR {{ Str::upper($vehicle->brand->name) }} {{ Str::upper($vehicle->model->name) }} ({{ $policy->vehicle->registration_no }})</b></u>
            </p>
            <p style="justify-content: center;text-align: justify;">
                Referring to the above
                matter, subsequent to a comprehensive review and technical inspection undertaken
                by our authorised specialist, we hereby grant <b>APPROVAL</b> for the repair
                claim being conducted by <b>{{ Str::upper($policy->claims->first()->workshop_name) }}</b>&nbsp; for the following vehicle:
            </p>

            <div class="row">
                <table style="width:70%; border: none;margin-left: auto;margin-right: auto;">
                    <tr>
                        <td>POLICY NO</td>
                        <td>:</td>
                        <td>{{ $policy->policy_no }}</td>
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

            <p style="justify-content: center;text-align: justify;"> Therefore, you may
                proceed to repair the vehicle as per discussed and mutually agreed upon. Please
                be advised that for this approval is subject to the following terms and
                conditions below:&nbsp;</p>

            <ul style="list-style-type: lower-roman; justify-content: center;text-align: justify;">
                <li>The sum amount of the approved claim is <b>RM {{ number_format($totalSum, 2, '.', ','); }}</b><i> (Please refer to the summary of the claim approval as enclosed)</i>.</li>
                <li>Upon acceptance of this claim settlement offer and subsequent payment of the approved amount to the repairer, Ezcare Warranty is hereby absolved and released from any additional obligation or liabilities in respect to this claim.</li>
                <li>This approval is valid for 10 days <b>ONLY</b> and the vehicle owners are under an obligation to comply with the repair recommendations provided by the workshop, regardless of the warranty coverage of the affected parts/items within the validity period of this approval.</li>
                <li>EZCARE WARRANTY reserves the right to refuse warranty coverage for any claim(s) in case of aggravated damage caused by non-compliance with the recommended repairs of the workshop or failure to commence the repair work within the specified timeframe.</li>
                <li>Should there be no invoice and/or response received within 21 days from the date of this approval letter, resulting in the presumption that the vehicle owner is not interested in pursuing the claim further, Ezcare Warranty shall automatically close the claim file.</li>
            </ul>

            <p class="u-align-justify u-text u-text-12"> Thank you and your cooperation is highly appreciated.</p>
            <p class="u-align-justify u-text u-text-13"><b>CLAIM DEPARTMENT</b></p>
            <br>
            <p class="u-align-justify u-text u-text-14"><i><b>CC: {{ Str::upper($policy->claims->first()->workshop_name) }}</b></i></p>

        </div>

        <br><br><br><br>
        <div class="u-clearfix u-sheet u-sheet-1" style="padding-top: 10%">
            <p>
                <center>
                    <b><u>CLAIM APPROVAL SUMMARY</u></b>
                </center>
            </p>
            <br>
            <div class="row">
                <table style="width:80%; border: none;">
                    <tr>
                        <td>POLICY NO</td>
                        <td>:</td>
                        <td><b>{{ $policy->policy_no }}</b></td>
                    </tr>
                    <tr>
                        <td>Vehicle Registration Number</td>
                        <td>:</td>
                        <td><b>{{ Str::upper($policy->vehicle->registration_no) }}</b></td>
                    </tr>
                    <tr>
                        <td>Warranty Plan</td>
                        <td>:</td>
                        <td><b>{{ $policy->warrantyPlan->name }}</b></td>
                    </tr>
                    <tr>
                        <td>Claim Aggregate Limit</td>
                        <td>:</td>
                        <td><b>RM {{ number_format($claimLimit->amount_limit, 2, '.', ','); }} </b> <i>per claim</i></td>
                    </tr>
                </table>
            </div>
            <br>
            <p class="u-text u-text-5">
                <b>CLAIM ITEM LIST :</b>
            </p>
            <div class="row">
                <table style="width:90%;border: 1px solid black;border-collapse: collapse;margin-left: auto;margin-right: auto;">
                    <tr style="border: 1px solid black;border-collapse: collapse;">
                        <th id="tableborder">NO</th>
                        <th id="tableborder" style="width:40%">ITEM</th>
                        <th id="tableborder">PRICE</th>
                        <th id="tableborder">REMARK</th>

                    </tr>
                    @foreach($policyClaim->claim_items as $claim)
                    <tr>
                        <td id="tableborder">{{ ($loop->index+1) }}</td>
                        <td id="tableborder">{{ $claim->item_name }}</td>
                        <td id="tableborder">RM {{ number_format($claim->price_approved, 2, '.', ','); }}</td>
                        <td id="tableborder">{{ $claim->remarks }}</td>
                    </tr>
                    @endforeach
                    <tr>
                        <td id="tableborder" colspan=4>
                            <b>AMOUNT APPROVAL: RM {{ number_format($totalSum, 2, '.', ','); }} ONLY</b>
                        </td>
                    </tr>
                </table>
            </div>
            <br>
            <p style="justify-content: center;text-align: justify;">
                It is hereby agreed and mutually understood that upon the approved amount of the claim to the policyholder in full satisfaction of all claims listed above.<br><br>
                For more details relating to the itemised coverage items, terms and conditions and exclusions, kindly refer to the warranty booklet/e-booklet.
            </p>
            <p>
                Should you need any further information, please do not hesitate to contact us at:
            </p>
            <p class="u-align-justify u-text u-text-13"><b>1 300 88 8287.</b></p>

            <br>
            <div style="border-bottom: 1px solid #000000;"></div>
            <br>

            <p style="justify-content: center;text-align: justify;"> I, <b>{{ Str::upper($customer->first_name) }}&nbsp;{{ Str::upper($customer->last_name) }}</b> acknowledges and confirm my acceptance
                of the approved claim amount provided by Ezcare Warranty as stated in this
                approval notice. I agree to the specified reimbursement or coverage outlined in
                the approval notice and hereby accept the terms and conditions associated with
                the approved claim amount.
            </p>

            <br><br>
            <div style="border-bottom: 1px solid #000000;width:200px"></div>
            <p class="u-align-justify u-text u-text-13"><b>NAME :</b></p>
            <p class="u-align-justify u-text u-text-13"><b>NRIC :</b></p>
            <br>
            <p class="u-align-justify u-text u-text-14"><i><b>CC: {{ Str::upper($policy->claims->first()->workshop_name) }}</b></i></p>

        </div>
    </main>
</body>

</html>