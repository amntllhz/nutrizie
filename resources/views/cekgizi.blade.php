<!DOCTYPE html>
<html lang="en" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ config('app.name') }} - Cek Gizi</title>
    <link rel="icon" href="{{ asset('img/nutrizie-icon.svg') }}">
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/navbar.js', 'resources/js/formval.js'])
</head>

<body class="font-in font-feature-settings-cv11">

    <section class="max-w-6xl p-10 mx-auto sm:w-full sm:p-6">
        <div class="flex font-semibold text-prim">
            {{ Breadcrumbs::render('cekgizi') }}
        </div>
    </section>

    <section class="max-w-6xl mx-auto px-10 sm:w-full sm:px-6 mb-20">
        <div class="flex flex-col w-full">
            <div class="space-y-4">

                {{-- heading --}}
                <h1 class="text-2xl text-prim font-bold sm:text-xl">Cek Status Gizi Balita</h1>
                <p class="text-gray-500 text-sm text-justify">Platform ini hadir untuk menyediakan informasi tentang
                    makanan bergizi,
                    pola makan yang tepat sesuai usia, serta cara mengatasi tantangan yang
                    sering dihadapi dalam memberi makan balita. <span class="font-bold text-prim">Cek status gizi</span>
                    balita Anda
                    secara langsung untuk memastikan mereka mendapatkan kebutuhan
                    nutrisi yang optimal
                </p>

                {{-- form --}}
                <form method="POST" action="{{ route('cekgizi.hitung') }}"
                    class="mt-10 grid grid-cols-6 gap-6 sm:grid-cols-1" x-data="formHandler"
                    x-on:submit.prevent="validateAndSubmit" novalidate>
                    @csrf

                    {{-- nama --}}
                    <div class="col-span-3">
                        <label for="nama" class="block mb-2 text-xs font-medium text-gray-400">Nama</label>
                        <input name="nama" id="nama" type="text" pattern="[A-Za-z\s]+"
                            oninput="this.value = this.value.replace(/[^a-zA-Z\s]/g, '')"
                            class="bg-gray-50
                            border border-gray-300 text-gratwo text-xs rounded-lg placeholder:text-gray-300
                            placeholder:text-[11px] focus:ring-prim focus:border-prim block w-full p-2.5"
                            placeholder="Tuliskan nama" required autocomplete="off" />
                    </div>

                    {{-- gender --}}
                    <div class="col-span-3">
                        <label for="gender" class="block mb-2 text-xs font-medium text-gray-400">Jenis Kelamin</label>
                        <div x-data="{
                            selectOpen: false,
                            selectedItem: { title: 'Laki-laki', value: 'Laki-laki' },
                            selectableItems: [
                                { title: 'Laki-laki', value: 'Laki-laki' },
                                { title: 'Perempuan', value: 'Perempuan' }
                            ],
                            selectableItemActive: null,
                            selectId: $id('select'),
                            selectDropdownPosition: 'bottom',
                            selectScrollToActiveItem() {
                                if (this.selectableItemActive) {
                                    const activeElement = document.getElementById(this.selectableItemActive.value + '-' + this.selectId)
                                    const newScrollPos = (activeElement.offsetTop + activeElement.offsetHeight) - this.$refs.selectableItemsList.offsetHeight;
                                    this.$refs.selectableItemsList.scrollTop = newScrollPos > 0 ? newScrollPos : 0;
                                }
                            },
                            selectableItemIsActive(item) {
                                return this.selectableItemActive && this.selectableItemActive.value === item.value;
                            },
                            selectPositionUpdate() {
                                const bottomPos = this.$refs.selectButton.getBoundingClientRect().top + this.$refs.selectButton.offsetHeight + parseInt(window.getComputedStyle(this.$refs.selectableItemsList).maxHeight);
                                this.selectDropdownPosition = window.innerHeight < bottomPos ? 'top' : 'bottom';
                            }
                        }" x-init="$watch('selectOpen', function() {
                            if (!selectedItem) {
                                selectableItemActive = selectableItems[0];
                            } else {
                                selectableItemActive = selectedItem;
                            }
                            setTimeout(() => selectScrollToActiveItem(), 10);
                            selectPositionUpdate();
                            window.addEventListener('resize', () => selectPositionUpdate());
                        });" class="relative w-full">
                            <!-- Tombol Dropdown -->
                            <button x-ref="selectButton" @click="selectOpen = !selectOpen" type="button"
                                class="relative flex justify-between bg-gray-50 border border-gray-300 text-gratwo text-xs rounded-lg placeholder:text-gray-300 focus:outline-1 focus:ring-1 focus:ring-prim focus:outline-prim focus:border-prim w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <span x-text="selectedItem ? selectedItem.title : 'Jenis Kelamin'"
                                    class="truncate"></span>
                                <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>

                            <!-- Dropdown List -->
                            <ul x-show="selectOpen" x-ref="selectableItemsList" @click.away="selectOpen = false"
                                x-transition:enter="transition ease-out duration-100"
                                x-transition:enter-start="opacity-0 -translate-y-1"
                                x-transition:enter-end="opacity-100 translate-y-0"
                                :class="{
                                    'bottom-0 mb-11': selectDropdownPosition ==
                                        'top',
                                    'top-0 mt-11': selectDropdownPosition == 'bottom'
                                }"
                                class="absolute w-full py-1 mt-1 overflow-auto text-xs bg-white rounded-md shadow-md max-h-56 border border-gray-200 focus:outline-none z-10 dark:bg-gray-700 dark:border-gray-600"
                                x-cloak>
                                <template x-for="item in selectableItems" :key="item.value">
                                    <li @click="
                                        selectedItem = item;
                                        selectOpen = false;
                                        $refs.hiddenSelect.value = item.value;
                                        $refs.selectButton.focus();
                                    "
                                        :id="item.value + '-' + selectId"
                                        :class="{
                                            'bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-white': selectableItemIsActive(
                                                item)
                                        }"
                                        @mousemove="selectableItemActive = item"
                                        class="relative flex items-center h-full py-2 pl-8 text-gratwo cursor-pointer select-none hover:bg-gray-50 dark:text-white dark:hover:bg-gray-600">
                                        <svg x-show="selectedItem && selectedItem.value === item.value"
                                            class="absolute left-0 w-3.5 h-3.5 ml-2 stroke-current text-prim"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        <span class="block font-medium truncate" x-text="item.title"></span>
                                    </li>
                                </template>
                            </ul>

                            <!-- Hidden input to send back to Laravel -->
                            <input type="hidden" name="gender" x-ref="hiddenSelect" value="Laki-laki" required>
                        </div>
                    </div>

                    {{-- umur --}}
                    <div class="col-span-2 sm:col-span-3">
                        <div class="flex items-center gap-x-2">
                            <label for="umur" class="block mb-2 text-xs font-medium text-gray-400">Usia
                            </label>
                            <p class="bg-prim/10 mb-2 font-semibold text-prim px-1 py-0.5 text-[9px] rounded-sm">
                                (Bulan)
                            </p>
                        </div>
                        <div class="relative rounded-lg">
                            <input name="umur" id="umur" type="text" pattern="[0-9]{2}"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '')"
                                class="bg-gray-50 border border-gray-300 text-gratwo text-xs rounded-lg placeholder:text-gray-300 placeholder:text-[11px] focus:ring-prim focus:border-prim block w-full p-2.5 pr-16 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white"
                                placeholder="Tuliskan Usia Dalam Bulan" required autocomplete="off" />
                        </div>
                    </div>

                    {{-- berat --}}
                    <div class="col-span-2 sm:col-span-3">
                        <div class="flex items-center gap-x-2">
                            <label for="berat" class="block mb-2 text-xs font-medium text-gray-400">Berat
                                Badan
                            </label>
                            <p class="bg-prim/10 mb-2 font-semibold text-prim px-1 py-0.5 text-[9px] rounded-sm">
                                (kg)
                            </p>
                        </div>
                        <div class="relative rounded-lg">
                            <input name="berat" id="berat" type="text" step="0.1" min="0"
                                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')"
                                class="bg-gray-50 border border-gray-300 text-gratwo text-xs rounded-lg placeholder:text-gray-300 placeholder:text-[11px] focus:ring-prim focus:border-prim block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white"
                                placeholder="Tuliskan Berat Badan" required autocomplete="off" />
                        </div>
                    </div>

                    {{-- panjang --}}
                    <div class="col-span-2 sm:col-span-3">
                        <div class="flex items-center gap-x-2">
                            <label for="panjang" class="block mb-2 text-xs font-medium text-gray-400">Panjang
                                Badan
                            </label>
                            <p class="bg-prim/10 mb-2 font-semibold text-prim px-1 py-0.5 text-[9px] rounded-sm">
                                (cm)
                            </p>
                        </div>
                        <div class="relative rounded-lg">
                            <input name="panjang" id="panjang" type="text" step="0.1" min="0"
                                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')"
                                class="bg-gray-50 border border-gray-300 text-gratwo text-xs rounded-lg placeholder:text-gray-300 placeholder:text-[11px] focus:ring-prim focus:border-prim block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white"
                                placeholder="Tuliskan Panjang Badan" required autocomplete="off" />
                        </div>
                    </div>

                    <button type="submit" :disabled="loading"
                        class="col-span-2 w-fit flex gap-x-1.5 justify-center items-center text-white text-center cursor-pointer font-semibold bg-prim hover:bg-gratwo transition duration-300 ease-in-out px-6 py-2 text-sm rounded-lg disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prim">

                        <svg x-show="!loading" class="h-4 w-4 text-white" width="100%" height="100%"
                            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20 10V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12M12.5 11H8M9 15H8M16 7H8M16.9973 14.8306C16.1975 13.9216 14.8639 13.6771 13.8619 14.5094C12.8599 15.3418 12.7188 16.7335 13.5057 17.7179C14.2926 18.7024 16.9973 21 16.9973 21C16.9973 21 19.7019 18.7024 20.4888 17.7179C21.2757 16.7335 21.1519 15.3331 20.1326 14.5094C19.1134 13.6858 17.797 13.9216 16.9973 14.8306Z"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>

                        <svg x-show="loading" class="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            style="display: none;">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>

                        <span x-text="loading ? 'Menghitung...' : 'Cek Status Gizi'"></span>
                    </button>
                </form>
            </div>
    </section>

    <x-footer></x-footer>

    <script>
        document.addEventListener('alpine:init', () => {
            Alpine.data('formHandler', () => ({
                loading: false,

                validateAndSubmit(e) {
                    this.loading = true;
                    let valid = true;
                    let firstErrorElement = null;

                    // Clear any previous error messages
                    document.querySelectorAll('.form-error-msg').forEach(el => el.remove());

                    // === 1. Validate Nama
                    const namaInput = document.getElementById('nama');
                    if (namaInput) {
                        const value = namaInput.value.trim();
                        if (!value) {
                            valid = false;
                            if (!firstErrorElement) firstErrorElement = namaInput;
                            namaInput.classList.add('ring-1', 'ring-red-400');

                            const msg = document.createElement('p');
                            msg.className =
                                'text-red-500 font-medium pl-1 text-[10px] mt-1 form-error-msg';
                            msg.textContent = 'Nama lengkap balita wajib diisi';
                            namaInput.parentElement.appendChild(msg);
                        } else if (!/^[A-Za-z\s]+$/.test(value)) {
                            valid = false;
                            if (!firstErrorElement) firstErrorElement = namaInput;
                            namaInput.classList.add('ring-1', 'ring-red-400');

                            const msg = document.createElement('p');
                            msg.className =
                                'text-red-500 font-medium pl-1 text-[10px] mt-1 form-error-msg';
                            msg.textContent = 'Nama hanya boleh terdiri dari huruf dan spasi';
                            namaInput.parentElement.appendChild(msg);
                        } else {
                            namaInput.classList.remove('ring-1', 'ring-red-400');
                        }
                    }

                    // === 2. Validate Gender Select
                    const genderInput = document.querySelector('input[name="gender"]');
                    if (genderInput) {
                        const wrapper = genderInput.closest('div.relative');
                        const selectButton = wrapper?.querySelector('button');
                        if (!genderInput.value) {
                            valid = false;
                            if (!firstErrorElement && wrapper) firstErrorElement = wrapper;
                            if (selectButton) {
                                selectButton.classList.add('ring-1', 'ring-red-400');
                            }

                            const msg = document.createElement('p');
                            msg.className =
                                'text-red-500 font-medium pl-1 text-[10px] mt-1 form-error-msg';
                            msg.textContent = 'Jenis kelamin wajib dipilih';
                            wrapper.parentElement.appendChild(msg);
                        } else if (selectButton) {
                            selectButton.classList.remove('ring-1', 'ring-red-400');
                        }
                    }

                    // === 3. Validate Umur
                    const umurInput = document.getElementById('umur');
                    if (umurInput) {
                        const value = umurInput.value.trim();
                        const ageNum = parseInt(value, 10);
                        if (!value) {
                            valid = false;
                            if (!firstErrorElement) firstErrorElement = umurInput;
                            umurInput.classList.add('ring-1', 'ring-red-400');

                            const msg = document.createElement('p');
                            msg.className =
                                'text-red-500 font-medium pl-1 text-[10px] mt-1 form-error-msg';
                            msg.textContent = 'Usia wajib diisi';
                            umurInput.closest('.relative').parentElement.appendChild(msg);
                        } else if (ageNum > 60) {
                            valid = false;
                            if (!firstErrorElement) firstErrorElement = umurInput;
                            umurInput.classList.add('ring-1', 'ring-red-400');

                            const msg = document.createElement('p');
                            msg.className =
                                'text-red-500 font-medium pl-1 text-[10px] mt-1 form-error-msg';
                            msg.textContent = 'Usia balita harus berada di kisaran 0 - 60 bulan';
                            umurInput.closest('.relative').parentElement.appendChild(msg);
                        } else {
                            umurInput.classList.remove('ring-1', 'ring-red-400');
                        }
                    }

                    // === 4. Validate Berat
                    const beratInput = document.getElementById('berat');
                    if (beratInput) {
                        const value = beratInput.value.trim();
                        const beratNum = parseFloat(value);
                        if (!value) {
                            valid = false;
                            if (!firstErrorElement) firstErrorElement = beratInput;
                            beratInput.classList.add('ring-1', 'ring-red-400');

                            const msg = document.createElement('p');
                            msg.className =
                                'text-red-500 font-medium pl-1 text-[10px] mt-1 form-error-msg';
                            msg.textContent = 'Berat badan wajib diisi';
                            beratInput.closest('.relative').parentElement.appendChild(msg);
                        } else if (isNaN(beratNum) || beratNum < 1.0 || beratNum > 30.0) {
                            valid = false;
                            if (!firstErrorElement) firstErrorElement = beratInput;
                            beratInput.classList.add('ring-1', 'ring-red-400');

                            const msg = document.createElement('p');
                            msg.className =
                                'text-red-500 font-medium pl-1 text-[10px] mt-1 form-error-msg';
                            msg.textContent = 'Berat badan harus berada di kisaran 1.0 - 30.0 kg';
                            beratInput.closest('.relative').parentElement.appendChild(msg);
                        } else {
                            beratInput.classList.remove('ring-1', 'ring-red-400');
                        }
                    }

                    // === 5. Validate Panjang
                    const panjangInput = document.getElementById('panjang');
                    if (panjangInput) {
                        const value = panjangInput.value.trim();
                        const panjangNum = parseFloat(value);
                        if (!value) {
                            valid = false;
                            if (!firstErrorElement) firstErrorElement = panjangInput;
                            panjangInput.classList.add('ring-1', 'ring-red-400');

                            const msg = document.createElement('p');
                            msg.className =
                                'text-red-500 font-medium pl-1 text-[10px] mt-1 form-error-msg';
                            msg.textContent = 'Panjang badan wajib diisi';
                            panjangInput.closest('.relative').parentElement.appendChild(msg);
                        } else if (isNaN(panjangNum) || panjangNum < 30.0 || panjangNum > 130.0) {
                            valid = false;
                            if (!firstErrorElement) firstErrorElement = panjangInput;
                            panjangInput.classList.add('ring-1', 'ring-red-400');

                            const msg = document.createElement('p');
                            msg.className =
                                'text-red-500 font-medium pl-1 text-[10px] mt-1 form-error-msg';
                            msg.textContent = 'Panjang badan harus berada di kisaran 30.0 - 130.0 cm';
                            panjangInput.closest('.relative').parentElement.appendChild(msg);
                        } else {
                            panjangInput.classList.remove('ring-1', 'ring-red-400');
                        }
                    }

                    // === 6. If form is invalid, cancel submit and scroll to first error
                    if (!valid) {
                        this.loading = false;
                        e.preventDefault();

                        if (firstErrorElement) {
                            // If it's the hidden input of gender select, scroll to the button instead
                            let targetElement = firstErrorElement;
                            if (firstErrorElement.tagName === 'INPUT' && firstErrorElement.type ===
                                'hidden') {
                                targetElement = firstErrorElement.closest('div.relative')
                                    ?.querySelector('button') || firstErrorElement;
                            }
                            // If input is wrapped inside a relative div (like age/weight/height fields), scroll to the wrapper
                            else if (firstErrorElement.parentElement.classList.contains('relative')) {
                                targetElement = firstErrorElement.parentElement;
                            }

                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }
                        return;
                    }

                    // === 7. Submit form if valid
                    e.target.submit();
                }
            }));
        });
    </script>
</body>

</html>
