<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    private string $apiKey;
    private string $endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent';

    public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key');
    }

    public function generateCatatan(string $gender, int $umur, string $statusBbu, string $statusPbu): ?string
    {
        $prompt = $this->buildPrompt($gender, $umur, $statusBbu, $statusPbu);

        try {
            $response = Http::timeout(5)
                ->withHeaders([
                    'x-goog-api-key' => $this->apiKey,
                    'Content-Type' => 'application/json',
                ])
                ->post($this->endpoint, [
                    'system_instruction' => [
                        'parts' => [
                            ['text' => $this->systemInstruction()]
                        ]
                    ],
                    'contents' => [
                        [
                            'role' => 'user',
                            'parts' => [
                                ['text' => $prompt]
                            ]
                        ]
                    ],
                ]);

            if ($response->successful()) {
                $data = $response->json();
                $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

                return $this->sanitize($text);
            }

            Log::warning('Gemini API gagal', ['status' => $response->status(), 'body' => $response->body()]);
            return null;
        } catch (\Exception $e) {
            Log::error('Gemini API error', ['message' => $e->getMessage()]);
            return null;
        }
    }

    private function systemInstruction(): string
    {
        return "Kamu adalah asisten edukasi gizi anak yang ramah dan mudah dipahami orang tua awam. "
            . "Tugasmu membuat catatan singkat berdasarkan hasil pemeriksaan status gizi balita. "
            . "Aturan wajib:\n"
            . "1. Jangan memberikan diagnosis medis definitif, dosis obat, atau anjuran pengobatan apa pun.\n"
            . "2. Untuk status yang mengindikasikan kondisi serius (sangat kurang, sangat pendek), arahkan dengan jelas agar segera memeriksakan anak ke tenaga kesehatan profesional (dokter/puskesmas/posyandu).\n"
            . "3. Gunakan bahasa sehari-hari yang hangat, bukan istilah medis kaku — bayangkan kamu menjelaskan ke orang tua yang baru pertama kali dengar istilah ini.\n"
            . "4. Jawaban harus 2-3 kalimat saja, dalam 1 paragraf, tanpa format markdown, tanpa heading, tanpa bullet point.\n"
            . "5. Variasikan gaya kalimat pembuka agar tidak terasa seperti template — jangan selalu mulai dengan frasa yang sama setiap kali.";
    }

    private function buildPrompt(string $gender, int $umur, string $statusBbu, string $statusPbu): string
    {
        $sebutan = $gender === 'Laki-laki' ? 'anak laki-laki' : 'anak perempuan';

        return "Buatkan catatan dan rekomendasi untuk orang tua dengan {$sebutan} berusia {$umur} bulan, "
            . "dengan hasil pemeriksaan sebagai berikut:\n\n"
            . "- Status Berat Badan menurut Umur (BB/U): {$statusBbu}\n"
            . "- Status Panjang/Tinggi Badan menurut Umur (PB/U): {$statusPbu}\n\n"
            . "Jelaskan apa arti kombinasi kedua status ini bagi pertumbuhan anak, dan berikan saran praktis "
            . "yang bisa langsung diterapkan orang tua di rumah.";
    }

    private function sanitize(?string $text): ?string
    {
        if (empty($text)) {
            return null;
        }

        $text = preg_replace('/[*#_`]/', '', $text);
        $text = trim($text);

        if (strlen($text) < 10 || strlen($text) > 1000) {
            return null;
        }

        return $text;
    }
}
