<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const agreed = ref(false)

function goRegister() {
  if (!agreed.value) return
  router.push('/account')
}
</script>

<template>
  <div class="mx-auto my-10 max-w-3xl rounded-lg bg-white p-6 shadow-sm">
    <!-- Header -->
    <h1 class="mb-2 text-center text-2xl font-bold text-gray-900">
      Reseller Terms & Conditions
    </h1>

    <p class="mb-6 text-center text-sm text-gray-500">
      <strong>Effective Date:</strong> 01 January 2026
    </p>

    <!-- Highlight -->
    <div class="mb-6 rounded border-l-4 border-blue-500 bg-blue-50 p-4 text-sm text-gray-700">
      By registering as a reseller on our website, you agree to comply with the following terms and conditions.
    </div>

    <!-- Content -->
    <section class="space-y-6 text-gray-700">
      <div>
        <h2 class="section-title">1. Account Registration & Approval</h2>
        <ul class="list-disc space-y-2 pl-5">
          <li>All reseller accounts require approval before activation.</li>
          <li>Approval time may take up to 24–48 working hours.</li>
          <li>We reserve the right to approve, reject, suspend, or terminate any reseller account.</li>
        </ul>
      </div>

      <div>
        <h2 class="section-title">2. Pricing, Profit & Commission</h2>
        <ul class="list-disc space-y-2 pl-5">
          <li>Products may offer fixed profit or commission-based earnings.</li>
          <li>Profit details are clearly displayed in the reseller dashboard.</li>
          <li>Selling below the company’s listed price is strictly prohibited.</li>
          <li>Prices may change due to supplier or market conditions.</li>
        </ul>
      </div>

      <div>
        <h2 class="section-title">3. Order Placement & Payment</h2>
        <ul class="list-disc space-y-2 pl-5">
          <li>Orders must be placed through the reseller dashboard.</li>
          <li>Cash on Delivery (COD) and prepaid orders are supported.</li>
          <li>Fake, test, or self-placed orders are strictly prohibited.</li>
          <li>Orders cannot be canceled once shipped.</li>
        </ul>
      </div>

      <div>
        <h2 class="section-title">4. Delivery Policy</h2>
        <ul class="list-disc space-y-2 pl-5">
          <li>Delivery available all over Bangladesh.</li>
          <li>
            Estimated delivery time:
            <ul class="mt-2 list-disc pl-5 text-sm">
              <li>Inside Dhaka: 1–3 working days</li>
              <li>Outside Dhaka: 2–5 working days</li>
            </ul>
          </li>
          <li>Courier delays are beyond our control.</li>
        </ul>
      </div>

      <div>
        <h2 class="section-title">5. Return & Refund Policy</h2>
        <ul class="list-disc space-y-2 pl-5">
          <li>Returns accepted only for damaged or incorrect products.</li>
          <li>Issues must be reported within 24 hours of delivery.</li>
          <li>No returns for change of mind.</li>
        </ul>
      </div>

      <div>
        <h2 class="section-title">6. Profit Settlement & Withdrawal</h2>
        <ul class="list-disc space-y-2 pl-5">
          <li>Profit added after successful delivery confirmation.</li>
          <li>Minimum withdrawal amount: ৳1,000.</li>
          <li>Payouts processed weekly or bi-weekly.</li>
          <li>bKash, Nagad, Rocket, or bank transfer supported.</li>
        </ul>
      </div>

      <div>
        <h2 class="section-title">7. Prohibited Activities</h2>
        <ul class="list-disc space-y-2 pl-5">
          <li>Fake or fraudulent orders.</li>
          <li>Misleading product information.</li>
          <li>Unauthorized use of company branding.</li>
          <li>Harassment of customers or couriers.</li>
        </ul>
      </div>

      <div>
        <h2 class="section-title">8. Account Suspension & Termination</h2>
        <ul class="list-disc space-y-2 pl-5">
          <li>Violation may lead to suspension or termination.</li>
          <li>Pending profits may be held during investigation.</li>
        </ul>
      </div>

      <div>
        <h2 class="section-title">9. Changes to Terms</h2>
        <p class="text-sm">
          Terms may be updated at any time. Changes take effect immediately upon posting.
        </p>
      </div>
    </section>

    <!-- Agreement -->
    <div class="mt-8 flex items-start gap-3">
      <input
        id="agree"
        type="checkbox"
        v-model="agreed"
        class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label for="agree" class="text-sm text-gray-700">
        I have read and agree to the Reseller Terms & Conditions
      </label>
    </div>

    <!-- Action -->
    <div class="mt-6 text-center">
       <button
        @click="goRegister"
        :disabled="!agreed"
        class="rounded-md px-6 py-3 text-sm font-semibold text-white transition"
        :class="agreed ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'"
      >
        Register as Reseller
      </button>
    </div>

    <!-- Footer -->
    <p class="mt-10 text-center text-xs text-gray-400">
      © 2026 AnalyticalJ. All rights reserved.
    </p>
  </div>
</template>

<style scoped>
.section-title {
  @apply mb-2 text-lg font-semibold text-gray-900;
}
</style>
