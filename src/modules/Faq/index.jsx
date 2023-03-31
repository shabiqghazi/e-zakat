import React from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion';

export default function Faq() {
  const faqs = [
    {
      tanya: "Apa itu zakat?",
      jawab: `Berdasarkan pengertian dari Badan Amil Zakat Nasional (https://baznas.go.id/zakat) zakat adalah bagian tertentu harta yang wajib dikeluarkan oleh setiap muslim apabila telah mencapai syarat yang ditetapkan.

      Dalam Al-Quran disebutkan : “Ambillah zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan menyucikan mereka” (QS. at-Taubah [9]: 103).
      
      Zakat (Zaka) artinya suci, baik, berkah di dalamnya terkandung harapan untuk memperoleh berkah, membersihkan jiwa dan memupuknya dengan berbagai kebaikan (Fikih Sunnah, Sayyid Sabiq: 5)`
    },
    {
      tanya: "Apakah syarat zakat atas harta?",
      jawab: `harta tersebut merupakan barang halal dan diperoleh dengan cara yang halal; harta tersebut dimiliki penuh oleh pemiliknya; harta tersebut merupakan harta yang dapat berkembang; harta tersebut mencapai nishab sesuai jenis hartanya; harta tersebut melewati haul; dan pemilik harta tidak memiliki hutang jangka pendek yang harus dilunasi.`
    },
    {
      tanya: "Siapa yang menerima zakat?",
      jawab: `Dalam QS. At-Taubah ayat 60, Allah memberikan ketentuan ada delapan golongan orang yang menerima zakat yaitu sebagai berikut:

      1.	Fakir, mereka yang hampir tidak memiliki apa-apa sehingga tidak mampu memenuhi kebutuhan pokok hidup.
      2.	Miskin, mereka yang memiliki harta namun tidak cukup untuk memenuhi kebutuhan dasar kehidupan.
      3.	Amil, mereka yang mengumpulkan dan mendistribusikan zakat.
      4.	Mualaf, mereka yang baru masuk Islam dan membutuhkan bantuan untuk menguatkan dalam tauhid dan syariah.
      5.	Riqab, budak atau hamba sahaya yang ingin memerdekakan dirinya.
      6.	Gharimin, mereka yang berhutang untuk kebutuhan hidup dalam mempertahankan jiwa dan izzahnya.
      7.	Fisabilillah, mereka yang berjuang di jalan Allah dalam bentuk kegiatan dakwah, jihad dan sebagainya.
      8.	Ibnu Sabil, mereka yang kehabisan biaya di perjalanan dalam ketaatan kepada Allah..`
    },
    {
      tanya: "Apa itu zakat mal?",
      jawab: `Zakat mal adalah zakat yang dikenakan atas segala jenis harta, yang secara zat maupun substansi perolehannya, tidak bertentangan dengan ketentuan agama. Sebagai contoh, zakat mal terdiri atas uang, emas, surat berharga, penghasilan profesi, dan lain-lain, sebagaimana yang terdapat dalam UU No 23/2011 tentang Pengelolaan Zakat, Peraturan Menteri Agama No 52 Tahun 2014 yang telah diubah dua kali dengan perubahan kedua adalah Peraturan Menteri Agama No 31/2019, dan pendapat Syaikh Dr. Yusuf Al-Qardhawi serta para ulama lainnya.`
    }
  ]
  return (
    <div>
      <Accordion multiple>
        {faqs.map((f, i) => (
          <AccordionTab key={i} header={f.tanya}>
            <p className="m-0">
              {f.jawab}
            </p>
          </AccordionTab>
        ))}
      </Accordion>
    </div>
  )
}
