# Kiracım.com - AI Destekli Kira Evi Önerisi Platform

Modern, AI destekli kira evi önerisi platformu. Next.js 14, TypeScript ve Tailwind CSS ile geliştirilmiştir.

## 🌟 Özellikler

### Sayfalar

- **Ana Sayfa**: Ev kartları listesi ve filtreleme
- **Ev Detay Sayfası**: Seçilen evin detaylı bilgileri
- **Karşılaştırma Sayfası**: 2-3 evi yan yana karşılaştırma
- **Profil Sayfası**: Kullanıcı tercihleri ve kişisel öneriler

### Bileşenler

- **Header**: Site logosu ve navigasyon (Ana Sayfa, Karşılaştır, Profil)
- **Footer**: Copyright bilgisi ve mobil bottom navigation
- **HouseCard**: Ev fotoğrafı, isim, konum, kira, ulaşım bilgileri
- **RouteCard**: Ulaşım yöntemi, süre ve maliyet gösterimi
- **Filter**: Şehir, kira aralığı, oda sayısı ve ilçe filtreleri

### Özellikler

- 🏠 **6 Örnek Ev**: Farklı şehir ve özelliklerde
- 👤 **Kullanıcı Profili**: Gelir, tercihler, araç durumu
- 🔍 **Gelişmiş Filtreleme**: Çoklu kriter desteği
- 📱 **Responsive Tasarım**: Mobil-öncelikli yaklaşım
- 🚗 **Ulaşım Bilgileri**: Otobüs, metro ve araç seçenekleri
- 🤖 **AI Hazır Altyapı**: Cursor AI entegrasyonu için hazır

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18+
- npm

### Kurulum

1. **Bağımlılıkları yükleyin:**

   ```bash
   npm install
   ```

2. **Geliştirme sunucusunu başlatın:**

   ```bash
   npm run dev
   ```

3. **Tarayıcıda açın:**
   http://localhost:3000

### Diğer Komutlar

```bash
# Production build
npm run build

# Production sunucusu
npm run start

# Linting
npm run lint
```

## 📱 Responsive Tasarım

- **Mobil**: Bottom navigation, tek sütun layout
- **Tablet**: İki sütun grid, optimize edilmiş kartlar
- **Desktop**: Üç sütun grid, sidebar navigation

## 🎨 Tasarım Sistemi

### Renkler

- **Primary**: #4F46E5 (Indigo)
- **Primary Light**: #6366F1
- **Primary Dark**: #3730A3

### Border Radius

- **Kartlar**: 16px
- **Butonlar/Input**: 12px

### Gölgeler

- **Kartlar**: shadow-sm (hafif gölge)

## 📂 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── house/[id]/        # Dinamik ev detay sayfası
│   ├── compare/           # Karşılaştırma sayfası
│   ├── profile/           # Profil sayfası
│   ├── globals.css        # Global CSS ve Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Ana sayfa
├── components/            # Yeniden kullanılabilir bileşenler
│   ├── Header.tsx         # Site başlığı ve navigasyon
│   ├── Footer.tsx         # Alt bilgi ve mobil nav
│   ├── HouseCard.tsx      # Ev kartı bileşeni
│   ├── RouteCard.tsx      # Ulaşım kartı bileşeni
│   └── Filter.tsx         # Filtreleme bileşeni
├── data/                  # Örnek veriler
│   ├── houses.ts          # 6 örnek ev verisi
│   └── user.ts            # Kullanıcı profil verisi
├── lib/                   # Yardımcı fonksiyonlar
│   └── cursor.ts          # AI API wrapper (örnek)
└── types/                 # TypeScript tipleri
    └── index.ts           # Ana tip tanımları
```

## 🤖 AI Entegrasyonu (Cursor)

### Mevcut API Wrapper'lar

- `getHouseRecommendations()` - Kullanıcı profiline göre öneriler
- `filterHouses()` - Kriterlere göre filtreleme
- `getAllHouses()` - Tüm evleri getir
- `getHouseById()` - ID ile ev detayı
- `getUserProfile()` - Kullanıcı profili
- `compareHouses()` - Ev karşılaştırması ve AI insights
- `getRouteRecommendations()` - Ulaşım önerileri

### Gelecek AI Özellikleri

- Gerçek zamanlı ev önerileri
- Ulaşım optimizasyonu
- Fiyat tahmini
- Mahalle analizi
- Kullanıcı davranış analizi

## 📊 Örnek Veri

### Evler

- Modern stüdyo daire (İstanbul, Kadıköy)
- Aile evi 2+1 (İstanbul, Beylikdüzü)
- Lüks rezidans 1+1 (İstanbul, Şişli)
- Öğrenci evi (Ankara, Çankaya)
- Deniz manzaralı villa (İzmir, Konak)
- Merkezi ofis yakını (İstanbul, Levent)

### Kullanıcı Profili

- **İsim**: Ahmet Yılmaz
- **Gelir**: 25.000 TL
- **Tercih Edilen İlçeler**: Kadıköy, Şişli, Levent
- **Araç**: Var
- **Çalışma**: Sabah mesaisi, Levent

## 🛠 Teknoloji Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons (SVG)
- **Images**: Next.js Image Optimization
- **Development**: ESLint, Prettier ready

## 📦 Deployment

### Vercel (Önerilen)

```bash
# Vercel CLI ile
npm i -g vercel
vercel

# Veya GitHub'a push ederek otomatik deploy
```

### Netlify

```bash
npm run build
# dist/ klasörünü Netlify'a yükle
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Geliştirme Notları

### Tailwind CSS Konfigürasyonu

- Custom renkler primary serisi için tanımlandı
- Border radius değerleri card ve button için özelleştirildi
- Container-custom utility class'ı eklendi

### TypeScript Tipleri

- Tüm veri yapıları için güçlü tip desteği
- Interface'ler gelecekte genişletilebilir
- Null safety ve error handling

### Performance

- Image lazy loading
- Static generation (SSG) ready
- Component-based architecture

## 🚧 Gelecek Özellikler

- [ ] Gerçek AI entegrasyonu
- [ ] Kullanıcı authentication
- [ ] Favori ev sistemi
- [ ] Email bildirimleri
- [ ] Harita entegrasyonu
- [ ] Virtual tour desteği
- [ ] Mobil uygulama

## 📄 License

MIT License

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişiklikleri commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'ı push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

---

**Kiracım.com** - Size en uygun kira evini bulmanın en akıllı yolu! 🏠✨
