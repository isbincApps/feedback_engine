<template>
	<q-page class="flex column items-center">
	   <h6>The file must have column named "review"</h6> 
       <q-table
       		 style="width: 80%"
		     class="col-8 q-mt-lg q-mr-lg q-py-lg q-mx-auto"
		     title="Scan"
		     :data="items"
		     :columns="cols"
		     :pagination.sync="pagination"
		      row-key="id"
		     :loading="loading"
		    >
		     <template v-slot:top-right>
		     	<div class="q-gutter-x-md">
		     	   <q-btn rounded flat icon="cloud_upload" label="Upload file" color="green-8" :loading="loading" @click="importFile"/>
		     	   <input type="file" id="txt_file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="parseFile" style="display: none;" />
		     	   <q-btn rounded icon="find_in_page" label="Scan" color="primary" :loading="loading" @click="scan">
                   </q-btn> 
		     	</div>
		      </template>
			   <q-td slot="body-cell-edit" slot-scope="props" :props="props">
			     <q-btn round icon="delete" color="negative" size="sm" @click="removeRow(props.row)"/>
			  </q-td>
  			</q-table>
	</q-page>	
</template>
<script>
import XLSX from 'xlsx'
import vader from 'vader-sentiment'
import { date } from 'quasar'
import { mapGetters } from 'vuex'   

function fixdata(data) {
   let o = "", l = 0, w = 10240;
   for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
	o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
	return o;
}	
export default {
	data () {
		return {
			filename: '',
		    pagination: {
				page: 1,
		        rowsPerPage: 10,
			}, 
			items: [],
			loading: false,
		     cols: [
			    { name: 'id', label: 'ID', field: 'id', align: 'left' },
			    { name: 'text', label: 'Text', field: 'text', align: 'left' }
			]	
		}
	},
	mounted () {
		this.$store.commit('app/setTitle', 'Upload')
	},
	methods: {
		importFile () {
          document.getElementById('txt_file').click()
		},
		parseFile (e) {
		console.log('el file', e.target.files[0])
			this.filename = e.target.files[0].name
		   const fileReader = new FileReader();
           fileReader.readAsArrayBuffer(e.target.files[0]);
           fileReader.onload = (d) => {
              const data = d.target.result;
              const arr = fixdata(data);
              const workbook = XLSX.read(btoa(arr), {type: 'base64'});
              console.log('el book', workbook)
              let result = {} 
              let sheetnames = []   
		      workbook.SheetNames.forEach(sheetName => {
		          let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {}) 
		          sheetnames.push(sheetName)   
		          if (roa.length) result[sheetName] = roa
		       });
		       console.log('el book', result)   
               this.parseData(result[sheetnames[0]])
            }
		},
		parseData (d) {
			let c = 0
			const data = d.filter(v => v.review !== '' || v['Review Text'] !== '').map(v => {
               c++
               return {
               	id: c,
               	text: v.review || v['Review Text']
               }
			})
			this.items = data
		},
		scan () {
          try {
          	let to = this.items.length
          	if (to == 0) {
          		this.$q.notify({
          			message: 'Please select a file',
          			color: 'warning',
          			icon: 'warning'
          		})
          		return
          	}
          	this.loading = true
          	let p = 0
          	let ne = 0
          	let da = []
          	let timeStamp = Date.now()
			let time = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss')
            this.items.forEach(v => {
               if (typeof v.text !== 'string') return
               const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(v.text);
               let se = ''
               if (intensity.compound > 0.05) {
               	 p++
               	 se = 'Positive'
               } else {
               	ne++
  				se = 'Negative'
               }
               da.push({
               	text: v.text,
               	sentiment: intensity.compound,
               	general: se,
               	// date: time
               })
            })
            const negative = ne * 100 / to
            const positive = p * 100 / to
            console.log('lo positive', positive)
            console.log('lo negative', negative)
            console.log('la data database', da)
			
			const doc = this.$db.collection(`docs`)
			// .doc(this.getUser.id) 
			doc.add({
				uid: this.getUser.id,
				date: time,
				data: da,
				name: this.filename,
				negative,
				positive 
			})
			this.items = []
		    this.$q.notify({
          			message: 'Your file has been successfully uploaded',
          			color: 'positive',
          			icon: 'done'
            })
			this.loading = false
          } catch (e) {
          	this.loading = false
          	console.log('error saving scan', e)
          	this.$q.notify({
	          message: 'Something is wrong, please try later',
	          color: 'negative',
	          icon: 'error'
	        })
          }
		}
	},
	computed: {
      ...mapGetters({
        getUser: 'auth/user'
      })
  	}
}	
</script>