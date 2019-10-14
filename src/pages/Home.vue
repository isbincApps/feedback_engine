<template>
  <q-page class="flex flex-start column q-pl-lg"> 
    <div class="row q-gutter-lg q-mt-xs q-mb-md">
      <q-btn icon="cloud_upload" label="Upload file" reverse :to="{path: '/upload'}" color="primary"></q-btn>
    </div>
    <q-table
     class="q-mt-lg q-mr-lg q-py-lg"
     title="Dashboard"
     :data="items"
     :columns="cols"
     :pagination.sync="pagination"
      row-key="_id"
      :filter="vBuscar"
      @request="getItems"
      :loading="loading"
    >
	    <template v-slot:top-right>
	        <q-input borderless dense debounce="300" v-model="vBuscar" placeholder="Search">
	          <template v-slot:append>
	            <q-icon name="search" />
	          </template>
	        </q-input>
	    </template>
     <q-td slot="body-cell-positive" slot-scope="props" :props="props">
      {{ props.row.positive }}%
     </q-td>
      <q-td slot="body-cell-negative" slot-scope="props" :props="props">
      {{ props.row.negative }}%
     </q-td>
	   <q-td slot="body-cell-download" slot-scope="props" :props="props">
	    <q-btn round icon="cloud_download" color="secondary" size="sm" @click="download(props.row)"/>
	  </q-td>
    </q-table>
  </q-page>
</template>
<script>
import { mapGetters } from 'vuex'   
import { date } from 'quasar'
import XLSX from 'xlsx'
export default {
  components: {
  },
  mounted () {
    this.$store.commit('app/setTitle', 'Dashboard')
    this.getItems({pagination: this.pagination, first: true})
  },  
  data () {
    return {
      vBuscar: '',
      cols: [
        { name: 'upload', label: 'Upload date', field: 'date', align: 'left'},
        { name: 'filename', label: 'File Name', field: 'name', align: 'left' },
        { name: 'negative', label: 'Negative', field: 'negative', align: 'left' },
        { name: 'positive', label: 'Positive', field: 'positive', align: 'left' },
        {name: 'download', label: 'Download', align: 'left'},
      ],
      items: [],
      selItem: null,
      loading: true,
      permisos: {},
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      }
    }
  },
  methods: {
    exportExel (d, n = 'File') {
       let ws = XLSX.utils.json_to_sheet(d);
       let wb = XLSX.utils.book_new();
       n = n.replace(' ', '_')
       XLSX.utils.book_append_sheet(wb, ws, n);
       XLSX.writeFile(wb, `${n}.xlsx`) 
    },
  	download (it) {
     this.exportExel(it.data, it.name)
  	},
    async getItems ({pagination, first}) {
           try {
            this.loading = true
            console.log('el getter u', this.getUser)
            const d = await this.$db.collection(`docs`).where('uid', '==', this.getUser.id).get()
            console.log('los items get', d)
            this.items = d.docs.map(v => {
              console.log('el v foreacg', v.id, v.data())
              return v.data()
            })
            this.loading = false  
           } catch (e) {
              console.log('error getting files', e)
               this.loading = false
               this.$q.notify({message: 'Error, try later', icon: 'warning', color: 'negative'})
           }
    }   
  },
  computed: {
      ...mapGetters({
        getUser: 'auth/user'
      })
  },
} 
</script>
