<?php

namespace App\Http\Controllers;

use App\Models\BbuLakilaki;
use App\Models\BbuPerempuan;
use App\Models\PbuLakilaki;
use App\Models\PbuPerempuan;
use App\Services\GeminiService;
use Illuminate\Http\Request;

class CekGiziController extends Controller
{
    // membuat logika untuk cek status gizi balita

    public function index()
    {
        return view('cekgizi');
    }

    public function hitung(Request $request)
    {
        // Validasi input
        $request->validate([
            'nama' => 'required',
            'metode_ukur' => 'required|in:PB,TB',
            'gender' => 'required',
            'umur' => 'required|numeric',
            'berat' => 'required',
            'panjang' => 'required',
        ]);

        // Ambil data input dari form
        $nama = $request->nama;
        $metodeUkur = $request->metode_ukur;
        $gender = $request->gender;
        $umur = $request->umur;
        $berat = $request->berat;
        $panjang = $request->panjang;
        $tanggalCek = now();

        /** Perhitungan BB/U **/
        // Ambil data antropometri BB/U berdasarkan gender dan umur
        $dataBbu = $gender === 'Laki-laki'
            ? BbuLakilaki::where('id_umur', $umur)->first()
            : BbuPerempuan::where('id_umur', $umur)->first();

        if (!$dataBbu) {
            return redirect()->back()->withErrors([
                'error' => 'Data BB/U tidak ditemukan untuk umur yang diberikan.',
            ]);
        }

        // Hitung Z-Score BB/U
        $zscoreBbu = $this->calculateZscore(
            $berat,
            $dataBbu->median,
            $dataBbu->sd1,
            $dataBbu->sdmin1
        );

        // Tentukan status gizi BB/U
        $statusBbu = $this->getStatusBbu($zscoreBbu);


        /** Perhitungan PB/U **/
        // Ambil data antropometri PB/U berdasarkan gender dan umur
        $koreksi = $this->getKoreksi($umur, $panjang, $metodeUkur);
        $panjangUntukRujukan = $koreksi['nilai'];
        $metodeRujukan = $koreksi['metode_rujukan'];

        $dataPbu = $gender === 'Laki-laki'
            ? PbuLakilaki::where('id_umur', $umur)->where('metode_ukur', $metodeRujukan)->first()
            : PbuPerempuan::where('id_umur', $umur)->where('metode_ukur', $metodeRujukan)->first();

        if (!$dataPbu) {
            return redirect()->back()->withErrors([
                'error' => 'Data PB/U tidak ditemukan untuk umur yang diberikan.',
            ]);
        }

        // Hitung Z-Score PB/U
        $zscorePbu = $this->calculateZscore(
            $panjangUntukRujukan,
            $dataPbu->median,
            $dataPbu->sd1,
            $dataPbu->sdmin1
        );

        // Tentukan status gizi PB/U
        $statusPbu = $this->getStatusPbu($zscorePbu);

        // Tentukan catatan
        $geminiService = new GeminiService();
        $catatanAi = $geminiService->generateCatatan($gender, $umur, $statusBbu, $statusPbu);

        $catatan = $catatanAi ?? $this->getCatatanFallback($statusBbu, $statusPbu);


        // Tampilkan hasil di view
        return view('hasilgizi', compact('nama', 'gender', 'umur', 'berat', 'panjang', 'zscoreBbu', 'statusBbu', 'zscorePbu', 'statusPbu', 'catatan', 'tanggalCek', 'metodeUkur'));
    }

    // Metode untuk menentukan metode ukur default berdasarkan standar Kemenkes
    private function getDefaultMetode($umur)
    {
        return $umur < 24 ? 'PB' : 'TB';
    }

    // Metode untuk menerapkan koreksi 0.7cm sesuai Permenkes No.2 Tahun 2020
    private function getKoreksi($umur, $panjang, $metodeUkurInput)
    {
        // Umur 24 punya rujukan PB dan TB asli, tidak perlu koreksi
        if ($umur == 24) {
            return [
                'nilai' => $panjang,
                'metode_rujukan' => $metodeUkurInput,
            ];
        }

        $defaultMetode = $this->getDefaultMetode($umur);

        // Jika metode ukur sesuai default umur, tidak perlu koreksi
        if ($metodeUkurInput === $defaultMetode) {
            return [
                'nilai' => $panjang,
                'metode_rujukan' => $defaultMetode,
            ];
        }

        // Anak <24 bulan diukur berdiri (TB) -> tambah 0.7cm, cocokkan ke tabel PB
        if ($umur < 24 && $metodeUkurInput === 'TB') {
            return [
                'nilai' => $panjang + 0.7,
                'metode_rujukan' => 'PB',
            ];
        }

        // Anak >24 bulan diukur terlentang (PB) -> kurang 0.7cm, cocokkan ke tabel TB
        if ($umur > 24 && $metodeUkurInput === 'PB') {
            return [
                'nilai' => $panjang - 0.7,
                'metode_rujukan' => 'TB',
            ];
        }

        // Fallback (seharusnya tidak pernah tercapai)
        return [
            'nilai' => $panjang,
            'metode_rujukan' => $defaultMetode,
        ];
    }

    // Metode untuk menghitung z-score
    private function calculateZscore($value, $median, $sd1, $sdmin1)
    {
        // Jika nilai lebih kecil dari median
        if ($value < $median) {
            return ($value - $median) / ($median - $sdmin1);
        }
        // Jika nilai lebih besar dari median
        return ($value - $median) / ($sd1 - $median);
    }

    // Tambahkan metode di bawah metode lain
    private function getCatatanFallback($statusBbu, $statusPbu)
    {
        $catatanBb = [
            'Berat Badan Sangat Kurang' => 'kondisi berat badan yang memerlukan perhatian segera, disarankan untuk konsultasi ke fasilitas kesehatan terdekat',
            'Berat Badan Kurang' => 'berat badan yang kurang dari ideal, perlu diperhatikan asupan makanan agar mendapatkan nutrisi yang cukup',
            'Berat Badan Normal' => 'berat badan yang baik, pertahankan pola makan dengan gizi seimbang',
            'Risiko Berat Badan Lebih' => 'risiko berat badan lebih, sebaiknya hindari makanan tinggi gula dan lemak',
        ];

        $catatanPb = [
            'Sangat Pendek' => 'indikasi stunting yang memerlukan intervensi dini, segera periksa ke fasilitas kesehatan',
            'Pendek' => 'panjang/tinggi badan yang kurang dari ideal, perlu pola makan bergizi dan stimulasi tumbuh kembang optimal',
            'Normal' => 'panjang/tinggi badan yang sesuai usia, pertahankan pola makan dan perawatan yang baik',
            'Tinggi' => 'panjang/tinggi badan di atas rata-rata, perhatikan pola makan agar tetap sesuai usia',
        ];

        $teksBb = $catatanBb[$statusBbu] ?? '';
        $teksPb = $catatanPb[$statusPbu] ?? '';

        return "Berdasarkan hasil pemeriksaan, balita menunjukkan {$teksBb}. Sementara itu, untuk indikator panjang/tinggi badan, balita menunjukkan {$teksPb}.";
    }


    // Metode untuk menentukan status gizi BB/U
    private function getStatusBbu($zscore)
    {
        if ($zscore < -3) {
            return 'Berat Badan Sangat Kurang';
        } elseif ($zscore >= -3 && $zscore < -2) {
            return 'Berat Badan Kurang';
        } elseif ($zscore >= -2 && $zscore <= 1) {
            return 'Berat Badan Normal';
        }
        return 'Risiko Berat Badan Lebih';
    }


    // Metode untuk menentukan status gizi PB/U
    private function getStatusPbu($zscore)
    {
        if ($zscore < -3) {
            return 'Sangat Pendek';
        } elseif ($zscore >= -3 && $zscore < -2) {
            return 'Pendek';
        } elseif ($zscore >= -2 && $zscore <= 1) {
            return 'Normal';
        }
        return 'Tinggi';
    }
}
