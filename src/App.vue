<template>

  <div id="app" class="container section">

    <!-- <StsAlert></StsAlert>

    <StsLoader></StsLoader>
      
    <StsModal
      message="Test Message"
    ></StsModal> -->

    <div class="columns is-multiline">

      <div class="column is-12">
        <h1 class="title">Article:</h1>
        <hr/>
        <StsArticle
          :title="articleData.title"
          :summary="articleData.summary"
          :icon="articleData.icon"
          :sideLinks="articleData.sideLinks"
        ></StsArticle>
      </div>

      <div class="column is-12">
        <h1 class="title">Header:</h1>
        <hr/>
        <StsHeader
          title="Test Title"
          subtitle="Test Subtitle"
          color="primary"
        ></StsHeader>
      </div>

      <div class="column is-4">
        <h1 class="title">Card:</h1>
        <hr/>
        <StsCard
          title="Test Title"
          :image="cardData.image"
          :footerImage="cardData.footerImage"
          :footerItems="cardData.footerItems"
        >Slot Text</StsCard>
      </div>
      
      <div class="column is-4">
        <h1 class="title">IconCard:</h1>
        <hr/>
        <StsIconCard
          name="Test Name"
          url="#"
        ></StsIconCard>
      </div>

      <div class="column is-4">
        <h1 class="title">Image:</h1>
        <hr/>
        <StsImage
          :image="{ 'src': 'https://images.sftcdn.net/images/t_optimized,f_auto/p/befbcde0-9b36-11e6-95b9-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg', 'description': 'Test Description', 'size': '16x9' }"
        ></StsImage>
      </div>
      
      <div class="column is-8 is-offset-2">
        <h1 class="title">Form:</h1>
        <hr/>
        <StsForm
          :formFields="formData.formFields"
          :formModels="formData.fieldModels"
          postUrl="/"
          :scrollToTop="false"
        ></StsForm>
      </div>

      <div class="column is-12">
        <h1 class="title">Navbar:</h1>
        <hr/>
        <StsNavbar
        brandUrl="#"
          :links="[{ 'url': '#', 'name': 'Test Link', 'description': 'Test Description', 'isActive': true }]"
        >
          <h1 slot="brand">Test Brand</h1>
        </StsNavbar>
      </div>

      <div class="column is-12">
        <h1 class="title">Table:</h1>
        <hr/>
        <StsTable
          :headings="tableData.tableHeadings"
          :rows="tableData.tableRows"
          :footerItems="tableData.tableFooter"
          :dataTable="true"
        ></StsTable>
      </div>

      <div class="column is-12">
        <h1 class="title">Tabs:</h1>
        <hr/>
        <StsTabs
          :titles="tabData.titles"
        >
          <p slot="Tab 1">Tab 1 Slot</p>
          <p slot="Tab 2">Tab 2 Slot</p>
          <p slot="Tab 3">Tab 3 Slot</p>
        </StsTabs>
      </div>

      <div class="column is-4 is-offset-4">
        <h1 class="title">Login:</h1>
        <hr/>
        <sts-login
          :branding="loginData.branding.data"
          post-url="/"
          reset-url="#"
          redirect-url="/"
        ></sts-login>
      </div>

    </div>

  </div>

</template>




<script>

  import moment from 'moment';

  import { StsAlert, StsArticle, StsCard, StsForm, StsHeader, StsIconCard, StsImage, StsLogin, StsLoader, StsModal, StsNavbar, StsNavLink, StsTable, StsTabs } from './components/index.js';

  export default {
    name: "app",
    components: {
      StsAlert,
      StsArticle,
      StsCard,
      StsForm,
      StsHeader,
      StsIconCard,
      StsImage,
      StsLoader,
      StsLogin,
      StsModal,
      StsNavbar,
      StsNavLink,
      StsTable,
      StsTabs
    },
    data() {
      return {
        articleData: {
          icon: 'fa-cog',
          image: { src: '/Content/Images/placeholder-img.jpg', description: '16x9 slot image', size: '16x9' },
          date: 'January 1, 2018',
          title: 'Test title',
          subtitle: 'Test Subtitle',
          summary: [
            '<h5 class="title is-5">Summary content:</h5>',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam semper est auctor, efficitur orci sed, molestie turpis. Vivamus diam est, volutpat id consectetur et, vulputate nec urna. Quisque hendrerit turpis eget magna facilisis, eu fermentum magna accumsan. In id risus nisi. Nunc sollicitudin urna a nibh tristique lobortis at vitae lacus. Nam quis neque sed erat rhoncus facilisis. Ut iaculis lobortis nisl. Sed dignissim non odio non suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dapibus tortor a efficitur molestie. Nunc aliquam libero erat, at maximus ipsum fermentum vitae. Integer in dui rutrum, vulputate nunc nec, blandit nunc. Suspendisse maximus tellus magna, et feugiat nisl aliquet viverra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
            'Etiam feugiat viverra sapien in pulvinar. Donec ut ipsum auctor, convallis purus id, ullamcorper purus. Fusce sit amet dolor ac elit efficitur posuere. Duis ipsum tellus, auctor quis laoreet sit amet, lobortis commodo purus. Mauris ultricies tristique ullamcorper. Aliquam nisl nisl, pretium et mollis sed, dignissim vitae justo. Donec egestas lacus ac turpis venenatis placerat. In a consequat enim, eu euismod turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ex nisi, porta quis pellentesque non, sagittis in risus.'
          ],
          url: '#',
          attachment: { title: 'AttachmentTitle.pdf', icon: 'fa-file-pdf-o' },
          linksTitle: 'Links Title',
          sideLinks: [
            { title: 'Title 1 name and description goes here', icon: 'fa-file-pdf-o', url: '#' },
            { title: 'Title 2', icon: 'fa-file-pdf-o', url: '#' },
            { title: 'Title 3', icon: 'fa-file-pdf-o', url: '#' }
          ]
        },
        cardData: {
          image: {
            src: 'http://bulma.io/images/placeholders/1280x960.png',
            alt: 'Placeholder image'
          },
          footerImage: {
            src: 'http://bulma.io/images/placeholders/1280x960.png',
            alt: 'Placeholder image',
            footer: true
          },
          footerItems: [
            'String data',
            { title: 'URL object', url: 'https://google.com' },
            { title: '<p><a href="https://google.com" target="_blank">HTML</a> object</p>' }
          ]
        },
        formData: {
          fieldModels: {
            textModel: '',
            disabledModel: 'This is a disabled field',
            areaModel: '',
            dateModel: '',
            rangeModel: '',
            emailModel: '',
            numberModel: 123,
            passwordModel: '',
            telModel: '',
            radioModel: '',
            checkModel: true,
            groupModel: [],
            selectModel: ''
          },
          // Form Data
          formFields: [
            {
              type: 'text',
              model: 'textModel',
              name: 'editable text',
              label: 'Text field',
              placeholder: 'Enter some text',
              validation: 'required|alpha_num',
              size: 8
            },
            {
              type: 'text',
              model: 'disabledModel',
              name: 'disabled text',
              disabled: true,
              label: 'Disabled text field',
              size: 4
            },
            {
              type: 'textarea',
              model: 'areaModel',
              name: 'text area',
              label: 'Text area field',
              placeholder: 'Enter some text'
            },
            {
              type: 'date',
              model: 'dateModel',
              name: 'selectable date',
              label: 'Date field with minDate = tomorrow, maxDate = 12/31/2017 and weekends disabled',
              placeholder: 'Choose a date',
              validation: 'required|date_format:MM/DD/YYYY|after:' + moment().format('MM/DD/YYYY'),
              options: {
                minDate: new Date().fp_incr(1),
                maxDate: '12/31/2020',
                defaultDate: new Date().fp_incr(1),
                disable: [
                  function(date) {
                    // Disable Sunday (0) and Saturday (6)
                    return (date.getDay() === 0 || date.getDay() === 6);
                  }
                ]
              }
            },
            {
              type: 'date',
              model: 'rangeModel',
              name: 'selectable range',
              label: 'Date range field',
              placeholder: 'Choose a date',
              validation: 'required',
              options: {
                mode: 'range'
              }
            },
            {
              type: 'email',
              model: 'emailModel',
              name: 'user email',
              label: 'Email field',
              placeholder: 'Enter your email',
              validation: 'required|email'
            },
            {
              type: 'number',
              model: 'numberModel',
              name: 'number section',
              label: 'Number field',
              placeholder: 'Enter a number here',
              validation: 'required|numeric|min_value:0.99|max_value:1000'
            },
            {
              type: 'password',
              model: 'passwordModel',
              name: 'password field',
              label: 'Password field',
              placeholder: 'Enter your password',
              validation: 'required'
            },
            {
              type: 'password',
              name: 'confirm password',
              label: 'Confirm password',
              placeholder: 'Re-enter your password',
              validation: 'required|confirmed:password field'
            },
            {
              type: 'tel',
              model: 'telModel',
              name: 'phone number',
              label: 'Telephone field',
              placeholder: 'Enter a telephone number',
              validation: 'required|digits:10',
              conditionalModel: 'groupModel',
              renderCondition: '.length > 1'
            },
            {
              type: 'radio',
              model: 'radioModel',
              name: 'radio buttons',
              label: 'Radio field',
              validation: 'required',
              options: [
                {
                  value: true,
                  label: 'Yes'
                },
                {
                  value: false,
                  label: 'No'
                }
              ]
            },
            {
              type: 'radio',
              model: 'radioModel',
              name: 'horizontal radio',
              label: 'Horizontal radio field',
              horizontal: true,
              options: [
                {
                  value: true,
                  label: 'Yes'
                },
                {
                  value: false,
                  label: 'No'
                }
              ],
              conditionalModel: 'groupModel',
              renderCondition: '.length > 1'
            },
            {
              type: 'checkbox',
              model: 'checkModel',
              name: 'consent box',
              label: 'True/false checkbox',
              validation: 'required',
              left: false
            },
            {
              type: 'check-group',
              model: 'groupModel',
              name: 'check group',
              label: 'Check group',
              options: [
                {
                  value: 1,
                  label: 'Option 1'
                },
                {
                  value: 2,
                  label: 'Option 2'
                },
                {
                  value: 3,
                  label: 'Option 3'
                },
                {
                  value: 4,
                  label: 'Option 4'
                },
                {
                  value: 5,
                  label: 'Option 5'
                }
              ]
            },
            {
              type: 'select',
              model: 'selectModel',
              name: 'select element',
              label: 'Select field',
              placeholder: 'Please Select an Option',
              options: [
                {
                  value: 'Option 1',
                  label: 1
                },
                {
                  value: 'Option 2',
                  label: 2
                },
                {
                  value: 'Option 3',
                  label: 3
                },
                {
                  value: 'Option 4',
                  label: 4
                },
                {
                  value: 'I am a conditional value that only shows up if the Check group length above is greater than 1!',
                  label: 'I am a conditional value that only shows up if the Check group length above is greater than 1!',
                  conditionalModel: 'groupModel',
                  renderCondition: '.length > 1'
                }
              ]
            }
          ]
        },
        tableData: {
          tableHeadings: [ 
            { name: 'OrderDate', abbreviation: 'Date' },
            'Region',
            { name: 'Representative', abbreviation: 'Rep' },
            'Item',
            'Units',
            { name: 'UnitCost', abbreviation: 'Cost' },
            'Total'
          ],
          tableRows: [
            [ '1/6/2016', 'East', 'Jones', 'Pencil', '95', '1.99', '189.05' ],
            [ '1/23/2016', 'Central', 'Kivell', 'Binder', '50', '19.99', '999.50' ],
            [ '2/9/2016', 'Central', '<strong>Jardine</strong>', 'Pencil', '36', '4.99', '179.64' ],
            [ '2/14/2016', 'West', 'Bob', 'Ruler', '84', '2.99', '301.67' ],
            [ '2/18/2016', 'West', 'Bob', 'Paper', '12', '14.99', '200.10' ],
            [ '2/19/2016', 'North', 'Patricia', 'Eraser', '100', '0.99', '100.64' ],
            [ '2/19/2016', 'North', 'Patricia', 'Pencil', '50', '4.99', '258.13' ],
            [ '2/25/2016', 'South', '<strong>Jardine</strong>', 'Glue', '45', '4.99', '205.74' ],
            [ '2/25/2016', 'South', '<strong>Jardine</strong>', 'Cups', '10', '3.99', '45.87' ],
            [ '2/26/2016', 'Central', '<strong>Jardine</strong>', 'Plates', '12', '8.99', '96.39' ],
            [ '3/01/2016', 'East', 'Bob', 'Plates', '11', '8.99', '89.64' ]
          ],
          tableFooter: [ '1', '2', '3', '4', '5', '6', '7' ],
          tableOptions: {
            canPrint: true,
            canDownload: true
          }
        },
        tabData: {
          titles: [
            { name: 'Tab 1' },
            { name: 'Tab 2', isActive: true },
            { name: 'Tab 3', isActive: false }
          ]
        },
        loginData: {
          branding: {
            data: {
              LogoPath: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
              Client: {
                ClientName: 'Google'
              }
            }
          }
        }
      };
    }
  };

</script>




<style lang="scss">

  @import "./assets/css/base.scss";
  @import "./assets/css/transitions.scss";
  
</style>
