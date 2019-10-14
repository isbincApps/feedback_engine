<template>
 <q-dialog
      v-model="mOpen">
      <q-card style="width: 500px; max-width: 80vw;" class="q-pa-lg items-center justify-center">
        <h5 class="">
            Payment Method
            <span class="right">${{amount}}</span>
        </h5>
        <div class="q-my-lg" ref="card"></div>
        <div class="col s12 
        place-order-button-block q-mt-lg">
            <q-btn class="bt-info" label="Place Order" @click="placeOrder"></q-btn>
        </div>
     </q-card>
    </q-dialog> 
</template>

<script>

// import firebase from 'firebase'
// import { Card, createToken } from 'vue-stripe-elements-plus'

// let stripe = Stripe('pk_test_r2fvrGG2MyQsOMHFTZOQJpa8')
// let elements = stripe.elements()
// let card = undefined

export default {
    props: ['open', 'close', 'total'],
    data() {
        return {
            mOpen: false,
            elementsSet: false,
            stripe: null,//"pk_test_r2fvrGG2MyQsOMHFTZOQJpa8",
            complete: false,
            cardNumberElement: null,
            cardExpiryElement: null,
            cardCVCElement: null,
            stripeValidationError: "",
            amount: 0,
            card: null
        };
    },
    async mounted () {
        // this.loading = false
        this.stripe = Stripe('pk_test_r2fvrGG2MyQsOMHFTZOQJpa8')
        let elements = this.stripe.elements()
        this.card = elements.create('card');
        // this.addComponent()
        this.amount = this.total
        await  this.$nextTick()
        // this.$nextTick(() => {
           // setTimeout(() => { 
        console.log('la ref card mounted', this.$refs.card)
        // this.addComponent() 
    },
    methods: {
        addComponent () {
          this.$nextTick(() => {
            console.log('el next tick')
            console.log('la ref card', this.$refs.card, this.card)
            let c = document.getElementById('card')
            console.log('la acrd html', c)
            
            this.card.mount(this.$refs.card);
          })
        },
        createAndMountFormElements() {
            var elements = this.stripe.elements();

            this.cardNumberElement = elements.create("cardNumber");
            this.cardNumberElement.mount("#card-number-element");

            this.cardExpiryElement = elements.create("cardExpiry");
            this.cardExpiryElement.mount("#card-expiry-element");

            this.cardCvcElement = elements.create("cardCvc");
            this.cardCvcElement.mount("#card-cvc-element");

            this.cardNumberElement.on("change", this.setValidationError);
            this.cardExpiryElement.on("change", this.setValidationError);
            this.cardCvcElement.on("change", this.setValidationError);
        },

        setValidationError(event) {
            this.stripeValidationError = event.error ? event.error.message : "";
        },
        async placeOrder() {
            try {
              const token = await this.stripe.createToken(this.card)
               console.log('el token', token)
               this.close(2, token.token)
            } catch (e) {
                console.log('error token', e)
                // this.close(2),
                this.$q.notify({
                    message: e.error.message,
                    color: 'negative',
                    icon: 'error' 
                })
            } 
        },
        /*
        saveDataToFireStore(stripeObject) {

            const db = firebase.firestore()
            const chargesRef = db.collection("charges")
            const pushId = chargesRef.doc().id

            db.collection("charges").doc(pushId).set(stripeObject)

            chargesRef.doc(pushId).onSnapshot(snapShot => {

                 const charge = snapShot.data();

                        if (charge.error) {
                            alert(charge.error);
                            chargesRef
                            .doc(pushId)
                            .delete();
                            return;
                        }

                        if (charge.status && charge.status == "succeeded") {
                            alert(charge.status);
                        }

            })
        }*/
    },
    watch: {
        open (v) {  
         this.mOpen = v
         if (v && !this.elementsSet) {
            this.elementsSet = false
            this.addComponent()
         } 
        },
        mOpen (v) {
         if (!v) this.close(1)
        },
        total (v) {
            this.amount = v
        }
    } 
};
</script>

<style scoped>
.stripe-card {
  width: 300px;
  border: 1px solid grey;
}
.stripe-card.complete {
  border-color: green;
}
.payment-form {
    max-width: 400px;
    margin: 20px auto;
    border: 1px solid #ececec;
}

.payment-form h5 {
    margin: 0;
    padding: 10px;
    font-size: 1.2rem;
}

.card-element {
    margin-top: 5px;
}

#card-number-element,
#card-expiry-element,
#card-cvc-element {
    background: white;
    padding: 5px;
    border: 1px solid #ececec;
    height: 30px;
}



.place-order-button-block {
    margin: 10px 0;
}
</style>