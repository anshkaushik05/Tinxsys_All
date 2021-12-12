var kaushik =11;
// display forms
document.getElementsByClassName('uiDisable')[0].addEventListener('click',()=>{
    // document.getElementsByClassName('uiDisable')[1].classList.add('border-transparent');
    // document.getElementsByClassName('uiDisable')[2].classList.add('border-transparent');
    

    if( document.getElementById("tinForm").classList.contains('hidden'))
        {
            // document.getElementsByClassName('uiDisable')[0].childNodes[1].classList.toggle('border-yellow-700');
            document.getElementById("tinForm").classList.toggle('hidden');
        }
    if(!document.getElementById("cstForm").classList.contains('hidden')    )
    {
        document.getElementById("cstForm").classList.toggle('hidden');
    }
    if(!document.getElementById("formVerification").classList.contains('hidden'))
    {
        document.getElementById("formVerification").classList.toggle('hidden');
    }
    if(!document.getElementById("detailsTable").classList.contains('hidden'))
    {
        document.getElementById("detailsTable").classList.toggle('hidden');
    }
    if(!document.getElementById("validTable").classList.contains('hidden'))
    {
        document.getElementById("validTable").classList.toggle('hidden');
    }
    if(!document.getElementById("printButton").classList.contains('hidden'))
    {
        document.getElementById("printButton").classList.toggle('hidden');
    }
    
    document.getElementById('tinValidTin').innerHTML="";
    document.getElementById('captchaValidTin').innerHTML="";

    document.getElementById('stateValidCst').innerHTML="";
    document.getElementById('cstValidCst').innerHTML="";
    document.getElementById('captchaValidCst').innerHTML="";

    document.getElementById('formTypeValidForm').innerHTML="";
    document.getElementById('stateValidForm').innerHTML="";
    document.getElementById('serialValidForm').innerHTML="";
    document.getElementById('captchaValidForm').innerHTML="";

})
document.getElementsByClassName('uiDisable')[1].addEventListener('click',()=>{
        document.getElementsByClassName('uiDisable')[0].click();
        document.getElementById("tinForm").classList.toggle('hidden');
        document.getElementById("cstForm").classList.toggle('hidden');
        // document.getElementById("formVerification").classList.toggle('hidden');
        // document.getElementsByClassName('uiDisable')[1].childNodes[1].classList.toggle('border-yellow-700');
        // document.getElementsByClassName('uiDisable')[0].classList.add('border-transparent');
        // document.getElementsByClassName('uiDisable')[2].classList.add('border-transparent');

})
document.getElementsByClassName('uiDisable')[2].addEventListener('click',()=>{
    document.getElementsByClassName('uiDisable')[0].click();
    document.getElementById("tinForm").classList.toggle('hidden');
        // document.getElementById("cstForm").classList.toggle('hidden');
        document.getElementById("formVerification").classList.toggle('hidden');
        // document.getElementsByClassName('uiDisable')[2].childNodes[1].classList.toggle('border-yellow-700');

})





// form validation and submition 

console.log(getCaptcha);
getCaptcha= getCaptcha.substr(0,getCaptcha.indexOf(' '));
//Tin form submit
document.getElementById('tinSubmit').addEventListener('click',(e)=>{
    // console.log('clicked');
    e.preventDefault();
    document.getElementById('tinValidTin').innerHTML="";
    document.getElementById('captchaValidTin').innerHTML="";


    var tinNumberForm=document.getElementById('tinNumberForm').value;
    var captcha = document.getElementById('tinNumberFormCaptcha').value;
    
    var trueTin=0, trueCaptcha = 0;
    if(tinNumberForm.toString().length!=11)
        document.getElementById('tinValidTin').innerHTML="Entered Tin is not 11 digits";
    else
        trueTin=1;
    if(captcha != getCaptcha)
        document.getElementById('captchaValidTin').innerHTML="Incorrect Captcha (case sensitive)";
    else
        trueCaptcha=1;
    
    if(trueCaptcha && trueTin){
        // console.log("all Good");
        var data={
            tinNumber : tinNumberForm,
            captcha : captcha
        }

        fetch('/tinForm',{
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res=>res.json()).then(data=>{
            // console.log(data);
            document.getElementById("tinForm").classList.toggle('hidden');
            document.getElementById('tinValidTin').innerHTML="";
            document.getElementById('captchaValidTin').innerHTML="";



            document.getElementById('tableHead').innerHTML=` Dealer details by TIN => ${data.TIN}   Search Time: ${new Date().toLocaleDateString()}   ${new Date().toLocaleTimeString()}  `;
            document.getElementById('tinTin').innerHTML=` ${data.TIN} `;
            document.getElementById('cstTin').innerHTML=` ${data.CST} `;
            document.getElementById('dealerNameTin').innerHTML=` ${data.DEALERNAME} `;
            document.getElementById('stateNameTin').innerHTML=` ${data.STATECODE} `;
            document.getElementById('panTin').innerHTML=` ${data.PAN} `;
            document.getElementById('regDateTin').innerHTML=` ${data.REGISTERDATE} `;
            document.getElementById('validStatusTin').innerHTML=` ${data.VALIDATIONSTATUS} `;
            document.getElementById('dateTin').innerHTML=` ${data.DATE} `;
            document.getElementById('addressTin1').innerHTML=` ${data.ADDRESS1} `;
            document.getElementById('addressTin2').innerHTML=` ${data.ADDRESS2} `;
            document.getElementById('addressTin3').innerHTML=` ${data.ADDRESS3} `;
            document.getElementById('addressTin4').innerHTML=` ${data.ADDRESS4} `;
            document.getElementById('addressTin5').innerHTML=` ${data.ADDRESS5} `;

            document.getElementById("detailsTable").classList.toggle('hidden');
            document.getElementById("printButton").classList.toggle('hidden');
        }).catch(e=>console.log("Error:"+e));
    }
    
})


//CST Form
document.getElementById('cstSubmit').addEventListener('click',(e)=>{
    // console.log('clicked');
    e.preventDefault();
    document.getElementById('stateValidCst').innerHTML="";
    document.getElementById('cstValidCst').innerHTML="";
    document.getElementById('captchaValidCst').innerHTML="";

    var stateNameCst=document.getElementById('stateNameCst').value;
    var cstNumberForm = document.getElementById('cstNumberForm').value;
    var captcha = document.getElementById('captchaCst').value;
    
    var trueCst=0, trueCaptcha = 0; 
    var trueStateNameCst=0;
    if(cstNumberForm.toString().length!=11)
        document.getElementById('cstValidCst').innerHTML="Entered CST is not 11 digits";
    else
        trueCst=1;
    if(stateNameCst=='')
        document.getElementById('stateValidCst').innerHTML="Please Input a State Value";
    else
        trueStateNameCst=1;
    if(captcha != getCaptcha)
        document.getElementById('captchaValidCst').innerHTML="Incorrect Captcha (case sensitive)";
    else
        trueCaptcha=1;
    
    if(trueCaptcha && trueCst && trueStateNameCst ){
        // console.log("all Good");
        var data={
            stateNumber : stateNameCst,
            cstNumber : cstNumberForm,
            captcha : captcha
        }



        fetch('/cstForm',{
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res=>res.json()).then(data=>{
            // console.log(data);


            document.getElementById('stateValidCst').innerHTML="";
            document.getElementById('cstValidCst').innerHTML="";
            document.getElementById('captchaValidCst').innerHTML="";

            document.getElementById("cstForm").classList.toggle('hidden');
            
            document.getElementById('tableHead').innerHTML=` Dealer details by TIN => ${data.TIN}   Search Time: ${new Date().toLocaleDateString()}   ${new Date().toLocaleTimeString()}  `;
            document.getElementById('tinTin').innerHTML=` ${data.TIN} `;
            document.getElementById('cstTin').innerHTML=` ${data.CST} `;
            document.getElementById('dealerNameTin').innerHTML=` ${data.DEALERNAME} `;
            document.getElementById('stateNameTin').innerHTML=` ${data.STATECODE} `;
            document.getElementById('panTin').innerHTML=` ${data.PAN} `;
            document.getElementById('regDateTin').innerHTML=` ${data.REGISTERDATE} `;
            document.getElementById('validStatusTin').innerHTML=` ${data.VALIDATIONSTATUS} `;
            document.getElementById('dateTin').innerHTML=` ${data.DATE} `;
            document.getElementById('addressTin1').innerHTML=` ${data.ADDRESS1} `;
            document.getElementById('addressTin2').innerHTML=` ${data.ADDRESS2} `;
            document.getElementById('addressTin3').innerHTML=` ${data.ADDRESS3} `;
            document.getElementById('addressTin4').innerHTML=` ${data.ADDRESS4} `;
            document.getElementById('addressTin5').innerHTML=` ${data.ADDRESS5} `;
            
            document.getElementById("detailsTable").classList.toggle('hidden');
            document.getElementById("printButton").classList.toggle('hidden');
        }).catch(e=>console.log("Error:"+e));

    }
    
})



// Form Verification

// formType
// stateNameForm
// seriesNumber
// serialNumber
// captchaFormValid
// validSubmit
document.getElementById('validSubmit').addEventListener('click',(e)=>{
    // console.log('clicked');
    e.preventDefault();
    document.getElementById('formTypeValidForm').innerHTML="";
    document.getElementById('stateValidForm').innerHTML="";
    document.getElementById('serialValidForm').innerHTML="";
    document.getElementById('captchaValidForm').innerHTML="";

    var formType=document.getElementById('formType').value;
    var stateNameForm=document.getElementById('stateNameForm').value;
    var seriesNumber = document.getElementById('seriesNumber').value;
    var serialNumber = document.getElementById('serialNumber').value;
    var captchaFormValid = document.getElementById('captchaFormValid').value;
    
    var trueSerial=0, trueCaptcha = 0; 
    var trueStateName=0, trueFormType=0;

    // if(seriesNumber.toString().length!=11)
    //     console.log('not 11 digit');
    // else
    //     trueCst=1;

    if(serialNumber.toString().length!=11)
        document.getElementById('serialValidForm').innerHTML="Entered Serial is not 11 digits";
    else
        trueSerial=1;

    if(formType=='')
        document.getElementById('formTypeValidForm').innerHTML="Please Input a Form Type";
    else
        trueFormType=1;

    if(stateNameForm=='')
        document.getElementById('stateValidForm').innerHTML="Please Input a State Value";
    else
        trueStateName=1;

    if(captchaFormValid != getCaptcha)
        document.getElementById('captchaValidForm').innerHTML="Incorrect Captcha (case sensitive)";
    else
        trueCaptcha=1;
    
    if(trueCaptcha && trueSerial && trueStateName && trueFormType){
        console.log("all Good");
        var data={
            formType: formType,
            seriesNumber : seriesNumber,
            serialNumber : serialNumber,
            stateNumber : stateNameForm,
            captcha : captchaFormValid
        }

        // document.getElementById("formVerification").classList.toggle('hidden');

            
        //     document.getElementById("validTable").classList.toggle('hidden');

        fetch('/formNumber',{
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res=>res.json()).then(result=>{
            console.log(result);
            document.getElementById("formVerification").classList.toggle('hidden');
            document.getElementById('validTableHead').innerHTML=`FORM '${result.formType}' <br> Search Time :${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
            document.getElementById('formType').innerHTML=`FORM '${result.formType}' `;
            document.getElementById('seriesNo').innerHTML=`${result.form.seriesNo} `;
            document.getElementById('serialNo').innerHTML=`${result.form.serialNo} `;
            document.getElementById('state').innerHTML=`${result.issuingState.state} `;
            document.getElementById('officeIssue').innerHTML=`${result.issuingState.officeIssue} `;
            document.getElementById('dateIssue').innerHTML=`${result.issuingState.dateIssue} `;

            document.getElementById('purchaserName').innerHTML=`${result.purchasingInfo.name} `;
            document.getElementById('purchaserAddress1').innerHTML=`${result.purchasingInfo.address.address1} `;
            document.getElementById('purchaserAddress2').innerHTML=`${result.purchasingInfo.address.address2} `;
            document.getElementById('purchaserAddress3').innerHTML=`${result.purchasingInfo.address.address3} `;
            document.getElementById('purchaserAddress4').innerHTML=`${result.purchasingInfo.address.address4} `;
            document.getElementById('purchaserAddress5').innerHTML=`${result.purchasingInfo.address.address5} `;
            document.getElementById('purchaserValidAsOn').innerHTML=`${result.purchasingInfo.validAsOn} `;
            document.getElementById('purchaserTin').innerHTML=`${result.purchasingInfo.tin} `;
            document.getElementById('purchaserCst').innerHTML=`${result.purchasingInfo.cst} `;

            document.getElementById('sellerName').innerHTML=`${result.sellerInfo.name} `;
            document.getElementById('sellerAddress1').innerHTML=`${result.sellerInfo.address.address1} `;
            document.getElementById('sellerAddress2').innerHTML=`${result.sellerInfo.address.address2} `;
            document.getElementById('sellerAddress3').innerHTML=`${result.sellerInfo.address.address3} `;
            document.getElementById('sellerAddress4').innerHTML=`${result.sellerInfo.address.address4} `;
            document.getElementById('sellerAddress5').innerHTML=`${result.sellerInfo.address.address5} `;
            document.getElementById('sellerAddress6').innerHTML=`${result.sellerInfo.address.address6} `;
            document.getElementById('sellerStateCode').innerHTML=`${result.sellerInfo.address.stateCode} `;
            document.getElementById('sellerValidAsOn').innerHTML=`${result.sellerInfo.validAsOn} `;
            document.getElementById('sellerTin').innerHTML=`${result.sellerInfo.tin} `;
            document.getElementById('sellerCst').innerHTML=`${result.sellerInfo.cst} `;

            document.getElementById('invoiceNumber').innerHTML=`${result.invoiceDetails.invoiceNumber} `;
            document.getElementById('invoiceValue').innerHTML=`${result.invoiceDetails.invoiceValue} `;
            document.getElementById('validStatus').innerHTML=`${result.validStatus} `;


        //     {
        //     formType: data.formType,
        //     form :{
        //       serialNo: data.serialNumber,
        //       serieslNo: result[0].CI_CI_SERIESNUMBER,
        //     },
        //     issuingState:{
        //       state:data.stateNumber,
        //       offileIssue:result[0].DM_MB_OFFICECODE,
        //       dateIssue:result[0].CREATED_DATE
     
        //     },
        //     purchasingInfo:{
        //        name:result[0].CI_CI_PURCHASERNAME,
        //        address:{
        //          address1:result[0].DM_MB_ADDRESS1,
        //          address2:result[0].DM_MB_ADDRESS2,
        //          address3:result[0].DM_MB_ADDRESS3,
        //          address4:result[0].DM_MB_ADDRESS4,
        //          address5:result[0].DM_MB_ADDRESS5
        //        },
        //        validAsOn:result[0].CI_CI_ISSUEDATE,
        //        tin:result[0].CI_CI_PURCHASERTIN,
        //        cst:result[0].CI_CI_PURCHASERCST
        //     },
        //     sellerInfo:{
        //       name:result[0].CI_CU_SELLERNAME,
        //       address:{
        //         address1:result[0].CI_CU_SELLERADDRESS1,
        //         address2:result[0].CI_CU_SELLERADDRESS2,
        //         address3:result[0].CI_CU_SELLERADDRESS3,
        //         address4:result[0].CI_CU_SELLERADDRESS4,
        //         address5:result[0].CI_CU_SELLERADDRESS5,
        //         address6:result[0].CI_CU_SELLERADDRESS6,
        //         stateCode:result[0].CI_CU_SELLERSTATECODE
        //       },
        //       validAsOn:result[0].CI_CI_ISSUEDATE,
        //       tin:result[0].CI_CU_SELLERTIN,
        //       cst:result[0].CI_CU_SELLERCST
     
        //     },
        //     invoiceDetails:{
        //       invoiceNumber:result[0].CI_ID_INVOICENUMBER,
        //       invoiceValue:result[0].CI_ID_INVOICEVALUE
        //     },
        //     validStatus:result[0].CI_ID_VALIDATIONSTATUS
     
        //  }

            
            document.getElementById("validTable").classList.toggle('hidden');
            document.getElementById("printButton").classList.toggle('hidden');

        
        }).catch(e=>console.log("Error:"+e));
    }
    
})



document.getElementById('printButton').addEventListener('click',()=>{
    // var printContents = document.getElementById('detailsTable').innerHTML;
    var originalContents = document.body.innerHTML;
    document.getElementById('tnc').classList.add('hidden');
    document.getElementById('footer').classList.add('hidden');
    document.getElementById('mainOptions').classList.add('hidden');
    document.getElementById('printButton').classList.add('hidden');
    document.getElementById('navbar').style.display='none';

    // document.body.innerHTML =  printContents  ;

    window.print();

    document.body.innerHTML = originalContents;
    document.getElementById('dealerFormNav').click();
});



