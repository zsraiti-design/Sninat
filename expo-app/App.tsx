import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  StatusBar,
  Alert,
  Linking,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Role = 'gateway' | 'patient' | 'doctor' | 'prosthetist';
type Lang = 'fr' | 'ar';

interface DoctorItem {
  id: string;
  name: string;
  nameAr: string;
  specialty: string;
  specialtyAr: string;
  city: string;
  cityAr: string;
  address: string;
  rating: number;
  reviewsCount: number;
  consultationFee: number;
  availableToday: boolean;
  phone: string;
}

interface CareItem {
  id: string;
  title: string;
  titleAr: string;
  avgPrice: string;
  duration: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface LabOrderItem {
  id: string;
  doctorName: string;
  patientRef: string;
  prosthesisType: string;
  shade: string;
  units: number;
  status: 'reçue' | 'modélisation' | 'usinage' | 'prête';
  deliveryDate: string;
}

interface AppointmentItem {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  patientName: string;
  patientPhone: string;
  date: string;
  time: string;
  status: 'confirmé' | 'en attente';
}

const DOCTORS_DATA: DoctorItem[] = [
  {
    id: 'doc-1',
    name: 'Dr. Karim Benjelloun',
    nameAr: 'د. كريم بنجلون',
    specialty: 'Chirurgien-Dentiste & Implantologie',
    specialtyAr: 'جراحة وزراعة الأسنان',
    city: 'Casablanca',
    cityAr: 'الدار البيضاء',
    address: 'Boulevard d’Anfa, Casablanca',
    rating: 4.9,
    reviewsCount: 142,
    consultationFee: 300,
    availableToday: true,
    phone: '+212522223344',
  },
  {
    id: 'doc-2',
    name: 'Dr. Amal El Idrissi',
    nameAr: 'د. أمل الإدريسي',
    specialty: 'Orthodontie & Esthétique du Sourire',
    specialtyAr: 'تقويم وتجميل الأسنان',
    city: 'Rabat',
    cityAr: 'الرباط',
    address: 'Avenue Mohammed VI, Agdal, Rabat',
    rating: 4.8,
    reviewsCount: 98,
    consultationFee: 350,
    availableToday: true,
    phone: '+212537667788',
  },
  {
    id: 'doc-3',
    name: 'Dr. Youssef Tazi',
    nameAr: 'د. يوسف التازي',
    specialty: 'Dentisterie Pédiatrique & Soins',
    specialtyAr: 'طب أسنان الأطفال والعلاجات',
    city: 'Marrakech',
    cityAr: 'مراكش',
    address: 'Guéliz, Marrakech',
    rating: 4.7,
    reviewsCount: 85,
    consultationFee: 250,
    availableToday: false,
    phone: '+212524332211',
  },
  {
    id: 'doc-4',
    name: 'Dr. Sofia Mansouri',
    nameAr: 'د. صوفيا المنصوري',
    specialty: 'Endodontie & Traitement Laser',
    specialtyAr: 'علاج الجذور وتقنية الليزر',
    city: 'Tanger',
    cityAr: 'طنجة',
    address: 'Place des Nations, Tanger',
    rating: 4.9,
    reviewsCount: 110,
    consultationFee: 300,
    availableToday: true,
    phone: '+212539887766',
  },
];

const CARE_ITEMS: CareItem[] = [
  { id: '1', title: 'Détartrage & Polissage', titleAr: 'تنظيف وتلميع الأسنان', avgPrice: '300 DH', duration: '30 min', icon: 'sparkles-outline' },
  { id: '2', title: 'Blanchiment Dentaire', titleAr: 'تبييض الأسنان الطبي', avgPrice: '1 800 DH', duration: '45 min', icon: 'sunny-outline' },
  { id: '3', title: 'Implant Dentaire', titleAr: 'زراعة الأسنان الفورية', avgPrice: '6 000 DH', duration: '60 min', icon: 'shield-outline' },
  { id: '4', title: 'Orthodontie (Bagues/Gouttières)', titleAr: 'تقويم الأسنان والشفاف', avgPrice: '12 000 DH', duration: 'Suivi', icon: 'happy-outline' },
  { id: '5', title: 'Urgences & Douleurs', titleAr: 'طوارئ وألم الأسنان الحاد', avgPrice: '350 DH', duration: 'Immédiat', icon: 'flash-outline' },
];

const INITIAL_LAB_ORDERS: LabOrderItem[] = [
  { id: 'CMD-1082', doctorName: 'Dr. Karim Benjelloun', patientRef: 'Dossier #982', prosthesisType: 'Couronne Zircone Multilayer', shade: 'A2 Vita', units: 3, status: 'modélisation', deliveryDate: '05 Nov' },
  { id: 'CMD-1083', doctorName: 'Dr. Amal El Idrissi', patientRef: 'Dossier #741', prosthesisType: 'Facettes E.max Céramique', shade: 'BL2 Bleach', units: 6, status: 'usinage', deliveryDate: '06 Nov' },
  { id: 'CMD-1084', doctorName: 'Dr. Youssef Tazi', patientRef: 'Dossier #312', prosthesisType: 'Châssis Métallique Stellite', shade: 'A3 Vita', units: 1, status: 'reçue', deliveryDate: '08 Nov' },
];

export default function App() {
  const [currentRole, setCurrentRole] = useState<Role>('gateway');
  const [lang, setLang] = useState<Lang>('fr');

  // Patient State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('Tous');
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<DoctorItem | null>(null);
  const [isBookingModalVisible, setIsBookingModalVisible] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingTime, setBookingTime] = useState('10:30');
  const [patientAppointments, setPatientAppointments] = useState<AppointmentItem[]>([
    {
      id: 'RDV-2041',
      doctorName: 'Dr. Karim Benjelloun',
      doctorSpecialty: 'Chirurgien-Dentiste',
      patientName: 'Mon Rendez-vous',
      patientPhone: '0661001122',
      date: 'Mercredi 5 Nov',
      time: '11:00',
      status: 'confirmé',
    },
  ]);
  const [patientTab, setPatientTab] = useState<'search' | 'appointments'>('search');

  // Doctor State
  const [doctorTab, setDoctorTab] = useState<'overview' | 'orders' | 'subscription'>('overview');
  const [newOrderType, setNewOrderType] = useState('Couronne Zircone');
  const [newOrderShade, setNewOrderShade] = useState('A2');
  const [newOrderUnits, setNewOrderUnits] = useState('1');
  const [newOrderPatient, setNewOrderPatient] = useState('');

  // Dental Lab State
  const [labOrders, setLabOrders] = useState<LabOrderItem[]>(INITIAL_LAB_ORDERS);
  const [labFilter, setLabFilter] = useState<string>('tous');

  // Emergency Call Action
  const handleCallEmergency = () => {
    Alert.alert(
      lang === 'ar' ? 'طوارئ طب الأسنان 24/7' : 'Urgences Dentaires 24/7',
      lang === 'ar'
        ? 'هل تريد الاتصال بالخط الساخن لأطباء المداومة؟ (+212 5 22 00 11 22)'
        : 'Voulez-vous appeler la permanence dentaire de garde ? (+212 5 22 00 11 22)',
      [
        { text: lang === 'ar' ? 'إلغاء' : 'Annuler', style: 'cancel' },
        {
          text: lang === 'ar' ? 'اتصال الآن' : 'Appeler',
          style: 'destructive',
          onPress: () => Linking.openURL('tel:+212522001122'),
        },
      ]
    );
  };

  // Submit Booking
  const handleConfirmBooking = () => {
    if (!bookingName.trim() || !bookingPhone.trim()) {
      Alert.alert(
        lang === 'ar' ? 'تنبيه' : 'Attention',
        lang === 'ar' ? 'يرجى كتابة الاسم ورقم الهاتف' : 'Veuillez saisir votre nom et numéro de téléphone'
      );
      return;
    }
    const newAppt: AppointmentItem = {
      id: `RDV-${Math.floor(1000 + Math.random() * 9000)}`,
      doctorName: selectedDoctorForBooking ? selectedDoctorForBooking.name : 'Dentiste de garde',
      doctorSpecialty: selectedDoctorForBooking ? selectedDoctorForBooking.specialty : 'Consultation',
      patientName: bookingName,
      patientPhone: bookingPhone,
      date: 'Aujourd’hui',
      time: bookingTime,
      status: 'confirmé',
    };
    setPatientAppointments([newAppt, ...patientAppointments]);
    setIsBookingModalVisible(false);
    setBookingName('');
    setBookingPhone('');
    setPatientTab('appointments');
    Alert.alert(
      lang === 'ar' ? 'تم الحجز بنجاح !' : 'Rendez-vous Confirmé !',
      lang === 'ar'
        ? `رقم الحجز: ${newAppt.id} عند ${newAppt.doctorName} على الساعة ${newAppt.time}`
        : `Votre RDV (${newAppt.id}) avec ${newAppt.doctorName} à ${newAppt.time} est validé.`
    );
  };

  // Dentist creates order for Lab
  const handleCreateLabOrder = () => {
    if (!newOrderPatient.trim()) {
      Alert.alert(lang === 'ar' ? 'تنبيه' : 'Champs requis', lang === 'ar' ? 'يرجى إدخال اسم أو مرجع المريض' : 'Veuillez indiquer le nom ou référence patient');
      return;
    }
    const order: LabOrderItem = {
      id: `CMD-${Math.floor(1100 + Math.random() * 8000)}`,
      doctorName: 'Dr. Karim Benjelloun',
      patientRef: newOrderPatient,
      prosthesisType: newOrderType,
      shade: `${newOrderShade} Vita`,
      units: parseInt(newOrderUnits, 10) || 1,
      status: 'reçue',
      deliveryDate: '48h ouvrées',
    };
    setLabOrders([order, ...labOrders]);
    setNewOrderPatient('');
    Alert.alert(
      lang === 'ar' ? 'تم إرسال الطلبية للمختبر !' : 'Commande transmise au Laboratoire !',
      lang === 'ar' ? `رقم الطلبية: ${order.id} قيد المراجعة والمعالجة.` : `La commande ${order.id} a été envoyée au prothésiste.`
    );
  };

  // Lab updates status
  const handleAdvanceOrderStatus = (orderId: string) => {
    setLabOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const nextMap: Record<LabOrderItem['status'], LabOrderItem['status']> = {
          reçue: 'modélisation',
          modélisation: 'usinage',
          usinage: 'prête',
          prête: 'reçue',
        };
        return { ...order, status: nextMap[order.status] };
      })
    );
  };

  // Filtered Doctors
  const filteredDoctors = DOCTORS_DATA.filter((doc) => {
    const matchesCity = selectedCity === 'Tous' || doc.city === selectedCity;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.nameAr.includes(searchQuery) ||
      doc.cityAr.includes(searchQuery);
    return matchesCity && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Main Top Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.logoRow}
          onPress={() => setCurrentRole('gateway')}
          activeOpacity={0.7}
        >
          <View style={styles.logoBadge}>
            <Ionicons name="medical" size={18} color="#0284C7" />
          </View>
          <View>
            <Text style={styles.brandTitle}>Sninat</Text>
            <Text style={styles.brandSubtitle}>
              {currentRole === 'gateway'
                ? lang === 'ar' ? 'المنصة الوطنية' : 'Portail National'
                : currentRole === 'patient'
                ? lang === 'ar' ? 'فضاء المريض' : 'Espace Patient'
                : currentRole === 'doctor'
                ? lang === 'ar' ? 'فضاء الطبيب' : 'Espace Médecin'
                : lang === 'ar' ? 'فضاء المختبر' : 'Espace Prothésiste'}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.emergencyBtn}
            onPress={handleCallEmergency}
            activeOpacity={0.8}
          >
            <Ionicons name="flash" size={13} color="#FFF" />
            <Text style={styles.emergencyBtnText}>141 Urgence</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.langBtn}
            onPress={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
          >
            <Text style={styles.langText}>{lang === 'fr' ? 'العربية' : 'FR'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ========================================================= */}
        {/* VIEW 1: GATEWAY (الصفحة الأولى: اختيار الصفة)              */}
        {/* ========================================================= */}
        {currentRole === 'gateway' && (
          <View style={styles.gatewayContainer}>
            <View style={styles.heroSection}>
              <View style={styles.brandEmblemBox}>
                <Ionicons name="finger-print-outline" size={44} color="#0284C7" />
              </View>
              <Text style={styles.heroTitle}>Sninat</Text>
              <Text style={styles.heroTagline}>
                {lang === 'ar'
                  ? 'المنظومة الرقمية الشاملة لطب وتعويضات الأسنان بالمغرب'
                  : 'L’écosystème bucco-dentaire & prothétique de référence au Maroc'}
              </Text>
              <Text style={styles.heroDescription}>
                {lang === 'ar'
                  ? 'مرحباً بك، اختر صفتك للولوج إلى الخدمات المناسبة:'
                  : 'Choisissez votre profil pour continuer vers votre espace dédié :'}
              </Text>
            </View>

            {/* 3 Profile Cards */}
            <View style={styles.cardsList}>
              {/* Option 1: Patient */}
              <TouchableOpacity
                style={styles.roleCard}
                onPress={() => setCurrentRole('patient')}
                activeOpacity={0.85}
              >
                <View style={[styles.cardIconBox, { backgroundColor: '#E0F2FE' }]}>
                  <Ionicons name="person-outline" size={26} color="#0284C7" />
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.cardTitleRow}>
                    <Text style={styles.cardTitle}>
                      {lang === 'ar' ? 'مريض أو زائر' : 'Patient / Visiteur'}
                    </Text>
                    <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                  </View>
                  <Text style={styles.cardDesc}>
                    {lang === 'ar'
                      ? 'حجز موعد فوري، البحث عن أطباء الأسنان، الاطلاع على الأسعار وطوارئ 24/7'
                      : 'Prendre rendez-vous en ligne, trouver un praticien agréé et soins dentaires'}
                  </Text>
                  <View style={styles.pillTag}>
                    <Text style={styles.pillText}>Soins & RDV En Ligne</Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Option 2: Doctor */}
              <TouchableOpacity
                style={styles.roleCard}
                onPress={() => setCurrentRole('doctor')}
                activeOpacity={0.85}
              >
                <View style={[styles.cardIconBox, { backgroundColor: '#DCFCE7' }]}>
                  <Ionicons name="medkit-outline" size={26} color="#16A34A" />
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.cardTitleRow}>
                    <Text style={styles.cardTitle}>
                      {lang === 'ar' ? 'طبيب أسنان' : 'Chirurgien-Dentiste'}
                    </Text>
                    <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                  </View>
                  <Text style={styles.cardDesc}>
                    {lang === 'ar'
                      ? 'تدبير أجندة العيادة، باقات الاشتراك، وإرسال طلبيات التلبيس والزرع للمختبرات'
                      : 'Gestion du cabinet, abonnements Pro & bon de commande prothétique'}
                  </Text>
                  <View style={[styles.pillTag, { backgroundColor: '#F0FDF4' }]}>
                    <Text style={[styles.pillText, { color: '#16A34A' }]}>Espace Praticien Pro</Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Option 3: Dental Lab */}
              <TouchableOpacity
                style={styles.roleCard}
                onPress={() => setCurrentRole('prosthetist')}
                activeOpacity={0.85}
              >
                <View style={[styles.cardIconBox, { backgroundColor: '#F3E8FF' }]}>
                  <Ionicons name="construct-outline" size={26} color="#9333EA" />
                </View>
                <View style={styles.cardContent}>
                  <View style={styles.cardTitleRow}>
                    <Text style={styles.cardTitle}>
                      {lang === 'ar' ? 'صانع الأسنان / مختبر' : 'Prothésiste Dentaire'}
                    </Text>
                    <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                  </View>
                  <Text style={styles.cardDesc}>
                    {lang === 'ar'
                      ? 'استقبال طلبيات الزيركون، E-max والشاسيه، متابعة مراحل CAD/CAM والتسليم'
                      : 'Réception commandes cliniques, CFAO Zircone/E.max & réseau praticiens'}
                  </Text>
                  <View style={[styles.pillTag, { backgroundColor: '#FAF5FF' }]}>
                    <Text style={[styles.pillText, { color: '#9333EA' }]}>Laboratoire de Prothèses</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* Emergency Hotline Alert */}
            <View style={styles.emergencyBox}>
              <View style={styles.emergencyIconBox}>
                <Ionicons name="shield-checkmark" size={24} color="#E11D48" />
              </View>
              <View style={styles.emergencyTextBox}>
                <Text style={styles.emergencyBoxTitle}>
                  {lang === 'ar' ? 'طوارئ طب الأسنان بالمغرب 24/7' : 'Service d’Urgence Dentaire 24/7'}
                </Text>
                <Text style={styles.emergencyBoxDesc}>
                  {lang === 'ar'
                    ? 'أطباء مداومون ومراكز إسعاف معتمدة في الدار البيضاء، الرباط، طنجة ومراكش.'
                    : 'Permanence médicale continue disponible sans rendez-vous préalable.'}
                </Text>
                <TouchableOpacity
                  style={styles.emergencyCallBtn}
                  onPress={handleCallEmergency}
                  activeOpacity={0.85}
                >
                  <Ionicons name="call" size={14} color="#FFF" />
                  <Text style={styles.emergencyCallText}>
                    {lang === 'ar' ? 'اتصال بالمداومة: 0522001122' : 'Appeler le +212 5 22 00 11 22'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: PATIENT PORTAL (فضاء المريض والبحث عن طبيب)         */}
        {/* ========================================================= */}
        {currentRole === 'patient' && (
          <View style={styles.portalContainer}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => setCurrentRole('gateway')}
            >
              <Ionicons name="arrow-back" size={16} color="#0284C7" />
              <Text style={styles.backBtnText}>
                {lang === 'ar' ? 'العودة للصفحة الرئيسية' : 'Retour à l’accueil'}
              </Text>
            </TouchableOpacity>

            {/* Segmented Control */}
            <View style={styles.tabBar}>
              <TouchableOpacity
                style={[styles.tabItem, patientTab === 'search' && styles.tabItemActive]}
                onPress={() => setPatientTab('search')}
              >
                <Ionicons
                  name="search-outline"
                  size={16}
                  color={patientTab === 'search' ? '#0284C7' : '#64748B'}
                />
                <Text
                  style={[styles.tabItemText, patientTab === 'search' && styles.tabItemTextActive]}
                >
                  {lang === 'ar' ? 'الأطباء والعلاجات' : 'Dentistes & Soins'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabItem, patientTab === 'appointments' && styles.tabItemActive]}
                onPress={() => setPatientTab('appointments')}
              >
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={patientTab === 'appointments' ? '#0284C7' : '#64748B'}
                />
                <Text
                  style={[
                    styles.tabItemText,
                    patientTab === 'appointments' && styles.tabItemTextActive,
                  ]}
                >
                  {lang === 'ar'
                    ? `مواعيدي (${patientAppointments.length})`
                    : `Mes RDV (${patientAppointments.length})`}
                </Text>
              </TouchableOpacity>
            </View>

            {patientTab === 'search' && (
              <View style={{ gap: 16 }}>
                {/* Search Bar */}
                <View style={styles.searchBox}>
                  <Ionicons name="search" size={18} color="#94A3B8" />
                  <TextInput
                    style={styles.searchInput}
                    placeholder={
                      lang === 'ar'
                        ? 'ابحث باسم الطبيب، التخصص، أو المدينة...'
                        : 'Rechercher un dentiste, un soin, une ville...'
                    }
                    placeholderTextColor="#94A3B8"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                      <Ionicons name="close-circle" size={18} color="#94A3B8" />
                    </TouchableOpacity>
                  )}
                </View>

                {/* City Pills */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cityScroll}>
                  {['Tous', 'Casablanca', 'Rabat', 'Marrakech', 'Tanger'].map((c) => (
                    <TouchableOpacity
                      key={c}
                      style={[styles.cityChip, selectedCity === c && styles.cityChipActive]}
                      onPress={() => setSelectedCity(c)}
                    >
                      <Text
                        style={[
                          styles.cityChipText,
                          selectedCity === c && styles.cityChipTextActive,
                        ]}
                      >
                        {c === 'Tous' ? (lang === 'ar' ? 'كل المدن' : 'Toutes les villes') : c}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                {/* Quick Care Carousel */}
                <Text style={styles.sectionHeader}>
                  {lang === 'ar' ? 'العلاجات الشائعة' : 'Soins Bucco-Dentaires'}
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ gap: 10 }}>
                  {CARE_ITEMS.map((care) => (
                    <TouchableOpacity
                      key={care.id}
                      style={styles.careCard}
                      onPress={() => {
                        setSelectedDoctorForBooking(DOCTORS_DATA[0]);
                        setIsBookingModalVisible(true);
                      }}
                      activeOpacity={0.8}
                    >
                      <View style={styles.careIconBox}>
                        <Ionicons name={care.icon} size={20} color="#0284C7" />
                      </View>
                      <Text style={styles.careTitle} numberOfLines={2}>
                        {lang === 'ar' ? care.titleAr : care.title}
                      </Text>
                      <Text style={styles.carePrice}>{care.avgPrice}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                {/* Doctors List */}
                <Text style={styles.sectionHeader}>
                  {lang === 'ar'
                    ? `أطباء الأسنان المتوفرون (${filteredDoctors.length})`
                    : `Chirurgiens-Dentistes Recommandés (${filteredDoctors.length})`}
                </Text>

                {filteredDoctors.map((doc) => (
                  <View key={doc.id} style={styles.doctorCard}>
                    <View style={styles.doctorHeaderRow}>
                      <View style={styles.doctorAvatar}>
                        <Text style={styles.doctorAvatarText}>
                          {doc.name.replace('Dr. ', '').substring(0, 2).toUpperCase()}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.doctorName}>
                          {lang === 'ar' ? doc.nameAr : doc.name}
                        </Text>
                        <Text style={styles.doctorSpecialty}>
                          {lang === 'ar' ? doc.specialtyAr : doc.specialty}
                        </Text>
                        <View style={styles.locationRow}>
                          <Ionicons name="location-outline" size={13} color="#64748B" />
                          <Text style={styles.locationText}>
                            {lang === 'ar' ? doc.cityAr : doc.city} • {doc.address}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.doctorFooter}>
                      <View style={styles.ratingBadge}>
                        <Ionicons name="star" size={12} color="#EAB308" />
                        <Text style={styles.ratingText}>{doc.rating}</Text>
                        <Text style={styles.reviewsCount}>({doc.reviewsCount})</Text>
                      </View>

                      <View style={styles.priceBadge}>
                        <Text style={styles.priceLabel}>
                          {lang === 'ar' ? 'الكشف:' : 'Consultation :'}
                        </Text>
                        <Text style={styles.priceValue}>{doc.consultationFee} DH</Text>
                      </View>

                      <TouchableOpacity
                        style={styles.bookBtn}
                        onPress={() => {
                          setSelectedDoctorForBooking(doc);
                          setIsBookingModalVisible(true);
                        }}
                      >
                        <Text style={styles.bookBtnText}>
                          {lang === 'ar' ? 'حجز موعد' : 'Prendre RDV'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {patientTab === 'appointments' && (
              <View style={{ gap: 12 }}>
                {patientAppointments.length === 0 ? (
                  <View style={styles.emptyBox}>
                    <Ionicons name="calendar-outline" size={40} color="#94A3B8" />
                    <Text style={styles.emptyText}>
                      {lang === 'ar' ? 'ليس لديك أي مواعيد حالياً' : 'Aucun rendez-vous planifié.'}
                    </Text>
                  </View>
                ) : (
                  patientAppointments.map((appt) => (
                    <View key={appt.id} style={styles.apptCard}>
                      <View style={styles.apptHeaderRow}>
                        <View>
                          <Text style={styles.apptDoctor}>{appt.doctorName}</Text>
                          <Text style={styles.apptSpecialty}>{appt.doctorSpecialty}</Text>
                        </View>
                        <View style={styles.apptBadge}>
                          <Text style={styles.apptBadgeText}>{appt.id}</Text>
                        </View>
                      </View>

                      <View style={styles.apptDetailsRow}>
                        <View style={styles.apptDetailItem}>
                          <Ionicons name="time-outline" size={14} color="#0284C7" />
                          <Text style={styles.apptDetailText}>
                            {appt.date} à {appt.time}
                          </Text>
                        </View>
                        <View style={styles.apptDetailItem}>
                          <Ionicons name="call-outline" size={14} color="#0284C7" />
                          <Text style={styles.apptDetailText}>{appt.patientPhone}</Text>
                        </View>
                      </View>

                      <TouchableOpacity
                        style={styles.cancelApptBtn}
                        onPress={() => {
                          setPatientAppointments(patientAppointments.filter((a) => a.id !== appt.id));
                          Alert.alert(
                            lang === 'ar' ? 'تم الإلغاء' : 'Annulation confirmée',
                            lang === 'ar' ? 'تم إلغاء الموعد بنجاح.' : 'Votre rendez-vous a été annulé.'
                          );
                        }}
                      >
                        <Text style={styles.cancelApptText}>
                          {lang === 'ar' ? 'إلغاء الموعد' : 'Annuler ce rendez-vous'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))
                )}
              </View>
            )}
          </View>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: DENTIST PORTAL (فضاء طبيب الأسنان والاشتراك)         */}
        {/* ========================================================= */}
        {currentRole === 'doctor' && (
          <View style={styles.portalContainer}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => setCurrentRole('gateway')}
            >
              <Ionicons name="arrow-back" size={16} color="#0284C7" />
              <Text style={styles.backBtnText}>
                {lang === 'ar' ? 'العودة للصفحة الرئيسية' : 'Retour accueil'}
              </Text>
            </TouchableOpacity>

            {/* Doctor Navigation Tabs */}
            <View style={styles.tabBar}>
              <TouchableOpacity
                style={[styles.tabItem, doctorTab === 'overview' && styles.tabItemActive]}
                onPress={() => setDoctorTab('overview')}
              >
                <Text style={[styles.tabItemText, doctorTab === 'overview' && styles.tabItemTextActive]}>
                  {lang === 'ar' ? 'لوحة القيادة' : 'Vue Générale'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabItem, doctorTab === 'orders' && styles.tabItemActive]}
                onPress={() => setDoctorTab('orders')}
              >
                <Text style={[styles.tabItemText, doctorTab === 'orders' && styles.tabItemTextActive]}>
                  {lang === 'ar' ? 'طلبيات المختبر' : 'Commandes Labo'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabItem, doctorTab === 'subscription' && styles.tabItemActive]}
                onPress={() => setDoctorTab('subscription')}
              >
                <Text style={[styles.tabItemText, doctorTab === 'subscription' && styles.tabItemTextActive]}>
                  {lang === 'ar' ? 'باقات الاشتراك' : 'Abonnement Pro'}
                </Text>
              </TouchableOpacity>
            </View>

            {doctorTab === 'overview' && (
              <View style={{ gap: 14 }}>
                <View style={styles.statsRow}>
                  <View style={styles.statCard}>
                    <Text style={styles.statNum}>8</Text>
                    <Text style={styles.statLabel}>
                      {lang === 'ar' ? 'مواعيد اليوم' : 'RDV Aujourd’hui'}
                    </Text>
                  </View>
                  <View style={styles.statCard}>
                    <Text style={styles.statNum}>{labOrders.length}</Text>
                    <Text style={styles.statLabel}>
                      {lang === 'ar' ? 'طلبيات بالمختبر' : 'Prothèses en cours'}
                    </Text>
                  </View>
                  <View style={styles.statCard}>
                    <Text style={[styles.statNum, { color: '#16A34A' }]}>98%</Text>
                    <Text style={styles.statLabel}>
                      {lang === 'ar' ? 'نسبة الالتزام' : 'Taux Présence'}
                    </Text>
                  </View>
                </View>

                <Text style={styles.sectionHeader}>
                  {lang === 'ar' ? 'جدول المواعيد القادمة' : 'Planning des Consultations'}
                </Text>
                {[
                  { time: '09:30', name: 'Mme. Fatima Zahra B.', act: 'Détartrage & Polissage' },
                  { time: '11:00', name: 'M. Mehdi Alaoui', act: 'Pose Couronne Zircone #16' },
                  { time: '14:30', name: 'M. Othman Bennani', act: 'Consultation Implantologie' },
                ].map((item, idx) => (
                  <View key={idx} style={styles.scheduleRow}>
                    <View style={styles.timeTag}>
                      <Text style={styles.timeTagText}>{item.time}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.scheduleName}>{item.name}</Text>
                      <Text style={styles.scheduleAct}>{item.act}</Text>
                    </View>
                    <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
                  </View>
                ))}
              </View>
            )}

            {doctorTab === 'orders' && (
              <View style={{ gap: 14 }}>
                <View style={styles.formCard}>
                  <Text style={styles.formTitle}>
                    {lang === 'ar' ? 'طلب تعويضات جديد للمختبر' : 'Nouveau Bon de Commande Prothétique'}
                  </Text>
                  <Text style={styles.inputLabel}>
                    {lang === 'ar' ? 'مرجع أو اسم المريض' : 'Nom / Dossier du Patient :'}
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Ex: Dossier #890 - Omar T."
                    value={newOrderPatient}
                    onChangeText={setNewOrderPatient}
                  />

                  <Text style={styles.inputLabel}>
                    {lang === 'ar' ? 'نوع التعويض المطلوب' : 'Type de Prothèse :'}
                  </Text>
                  <View style={styles.pickerRow}>
                    {['Couronne Zircone', 'Facette E.max', 'Châssis Métal'].map((t) => (
                      <TouchableOpacity
                        key={t}
                        style={[styles.choiceChip, newOrderType === t && styles.choiceChipActive]}
                        onPress={() => setNewOrderType(t)}
                      >
                        <Text style={[styles.choiceChipText, newOrderType === t && styles.choiceChipTextActive]}>
                          {t}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.inputLabel}>Teinte Vita :</Text>
                      <TextInput
                        style={styles.textInput}
                        value={newOrderShade}
                        onChangeText={setNewOrderShade}
                        placeholder="A1, A2, BL2..."
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.inputLabel}>
                        {lang === 'ar' ? 'عدد الوحدات' : 'Nombre d’unités :'}
                      </Text>
                      <TextInput
                        style={styles.textInput}
                        keyboardType="numeric"
                        value={newOrderUnits}
                        onChangeText={setNewOrderUnits}
                      />
                    </View>
                  </View>

                  <TouchableOpacity style={styles.submitOrderBtn} onPress={handleCreateLabOrder}>
                    <Ionicons name="send" size={16} color="#FFF" />
                    <Text style={styles.submitOrderBtnText}>
                      {lang === 'ar' ? 'إرسال الطلب للمختبر الشريك' : 'Envoyer au Laboratoire'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {doctorTab === 'subscription' && (
              <View style={{ gap: 14 }}>
                <View style={styles.subCard}>
                  <View style={styles.subHeader}>
                    <Text style={styles.subTitle}>Pack Cabinet Pro</Text>
                    <Text style={styles.subPrice}>299 DH <Text style={{ fontSize: 12 }}>/ mois</Text></Text>
                  </View>
                  <Text style={styles.subDesc}>
                    {lang === 'ar'
                      ? 'ظهور مميز في محرك البحث الوطني، استقبال حجوزات غير محدودة، وربط رقمي مع مختبرات التعويضات.'
                      : 'Visibilité prioritaire sur le portail Sninat, agenda en ligne synchronisé & bon de commande labo.'}
                  </Text>
                  <TouchableOpacity
                    style={styles.subActionBtn}
                    onPress={() =>
                      Alert.alert(
                        'Pack Cabinet Pro',
                        'Votre demande d’abonnement a été reçue par notre équipe commerciale Sninat.'
                      )
                    }
                  >
                    <Text style={styles.subActionBtnText}>
                      {lang === 'ar' ? 'تفعيل اشتراك العيادة' : 'Activer mon Cabinet Pro'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}

        {/* ========================================================= */}
        {/* VIEW 4: PROSTHETIST PORTAL (فضاء صانع الأسنان والمختبر)      */}
        {/* ========================================================= */}
        {currentRole === 'prosthetist' && (
          <View style={styles.portalContainer}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => setCurrentRole('gateway')}
            >
              <Ionicons name="arrow-back" size={16} color="#0284C7" />
              <Text style={styles.backBtnText}>
                {lang === 'ar' ? 'العودة للصفحة الرئيسية' : 'Retour accueil'}
              </Text>
            </TouchableOpacity>

            <View style={styles.labHeaderBanner}>
              <View style={{ flex: 1 }}>
                <Text style={styles.labTitle}>
                  {lang === 'ar' ? 'مختبر التعويضات الرقمية (CFAO)' : 'Laboratoire Dentaire Numérique (CAD/CAM)'}
                </Text>
                <Text style={styles.labSubtitle}>
                  {lang === 'ar'
                    ? 'إدارة خط إنتاج الزيركون، E-max والمعدن والتسليم للأطباء'
                    : 'Suivi de production en flux direct avec les cabinets dentaires'}
                </Text>
              </View>
              <View style={styles.labBadge}>
                <Ionicons name="hardware-chip-outline" size={24} color="#9333EA" />
              </View>
            </View>

            {/* Filter orders */}
            <Text style={styles.sectionHeader}>
              {lang === 'ar' ? 'طلبيات الأطباء قيد الإنجاز' : 'Commandes Praticiens en Cours'}
            </Text>

            {labOrders.map((order) => {
              const statusColor =
                order.status === 'prête'
                  ? '#16A34A'
                  : order.status === 'usinage'
                  ? '#EA580C'
                  : order.status === 'modélisation'
                  ? '#0284C7'
                  : '#9333EA';

              return (
                <View key={order.id} style={styles.labOrderCard}>
                  <View style={styles.labOrderRow}>
                    <View>
                      <Text style={styles.labOrderNum}>{order.id}</Text>
                      <Text style={styles.labOrderDoc}>{order.doctorName}</Text>
                    </View>
                    <View style={[styles.statusTag, { backgroundColor: `${statusColor}15` }]}>
                      <Text style={[styles.statusTagText, { color: statusColor }]}>
                        {order.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.orderDetailBox}>
                    <Text style={styles.orderDetailItem}>
                      • Type : <Text style={{ fontWeight: '700' }}>{order.prosthesisType}</Text>
                    </Text>
                    <Text style={styles.orderDetailItem}>
                      • Patient : {order.patientRef} | Teinte : {order.shade} ({order.units} unité(s))
                    </Text>
                    <Text style={styles.orderDetailItem}>
                      • Livraison : {order.deliveryDate}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[styles.advanceBtn, { borderColor: statusColor }]}
                    onPress={() => handleAdvanceOrderStatus(order.id)}
                  >
                    <Ionicons name="arrow-forward-circle" size={16} color={statusColor} />
                    <Text style={[styles.advanceBtnText, { color: statusColor }]}>
                      {lang === 'ar'
                        ? 'تحديث مرحلة التصنيع (CAD/CAM)'
                        : 'Passer à l’étape suivante de production'}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* ========================================================= */}
      {/* MODAL: PATIENT APPOINTMENT BOOKING MODAL                  */}
      {/* ========================================================= */}
      <Modal visible={isBookingModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {lang === 'ar' ? 'تأكيد حجز الموعد' : 'Confirmer votre Rendez-vous'}
              </Text>
              <TouchableOpacity onPress={() => setIsBookingModalVisible(false)}>
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            {selectedDoctorForBooking && (
              <View style={styles.modalDoctorSnippet}>
                <Ionicons name="medical" size={20} color="#0284C7" />
                <View>
                  <Text style={styles.modalDoctorName}>{selectedDoctorForBooking.name}</Text>
                  <Text style={styles.modalDoctorSpec}>
                    {selectedDoctorForBooking.specialty} • {selectedDoctorForBooking.city}
                  </Text>
                </View>
              </View>
            )}

            <Text style={styles.inputLabel}>{lang === 'ar' ? 'الاسم الكامل :' : 'Nom & Prénom :'}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ex: Yassine Cherkaoui"
              value={bookingName}
              onChangeText={setBookingName}
            />

            <Text style={styles.inputLabel}>
              {lang === 'ar' ? 'رقم الهاتف المحمول :' : 'Numéro de Téléphone (WhatsApp) :'}
            </Text>
            <TextInput
              style={styles.textInput}
              keyboardType="phone-pad"
              placeholder="06 61 00 22 33"
              value={bookingPhone}
              onChangeText={setBookingPhone}
            />

            <Text style={styles.inputLabel}>
              {lang === 'ar' ? 'اختر توقيت الاستشارة :' : 'Créneau Horaire Souhaité :'}
            </Text>
            <View style={styles.slotsRow}>
              {['09:30', '10:30', '11:30', '14:30', '16:00', '17:30'].map((slot) => (
                <TouchableOpacity
                  key={slot}
                  style={[styles.slotChip, bookingTime === slot && styles.slotChipActive]}
                  onPress={() => setBookingTime(slot)}
                >
                  <Text
                    style={[
                      styles.slotChipText,
                      bookingTime === slot && styles.slotChipTextActive,
                    ]}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.confirmBookingBtn} onPress={handleConfirmBooking}>
              <Text style={styles.confirmBookingBtnText}>
                {lang === 'ar' ? 'تأكيد الحجز الفوري' : 'Valider la Réservation'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  brandSubtitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emergencyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E11D48',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  emergencyBtnText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  langBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  langText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  gatewayContainer: {
    gap: 18,
  },
  heroSection: {
    alignItems: 'center',
    marginVertical: 12,
  },
  brandEmblemBox: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
  },
  heroTagline: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0284C7',
    marginTop: 4,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 320,
  },
  cardsList: {
    gap: 12,
  },
  roleCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    gap: 3,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
  pillTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  pillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0284C7',
  },
  emergencyBox: {
    backgroundColor: '#FFF1F2',
    borderWidth: 1,
    borderColor: '#FFE4E6',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  emergencyIconBox: {
    marginTop: 2,
  },
  emergencyTextBox: {
    flex: 1,
    gap: 4,
  },
  emergencyBoxTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9F1239',
  },
  emergencyBoxDesc: {
    fontSize: 11,
    color: '#BE123C',
    lineHeight: 15,
  },
  emergencyCallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E11D48',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  emergencyCallText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  portalContainer: {
    gap: 14,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  backBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0284C7',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    padding: 3,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tabItemActive: {
    backgroundColor: '#FFFFFF',
  },
  tabItemText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  tabItemTextActive: {
    color: '#0284C7',
    fontWeight: '700',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
  },
  cityScroll: {
    flexDirection: 'row',
  },
  cityChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
  },
  cityChipActive: {
    backgroundColor: '#0284C7',
    borderColor: '#0284C7',
  },
  cityChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  cityChipTextActive: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginVertical: 4,
  },
  careCard: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 10,
    gap: 6,
  },
  careIconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  careTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    minHeight: 32,
  },
  carePrice: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284C7',
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  doctorHeaderRow: {
    flexDirection: 'row',
    gap: 12,
  },
  doctorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorAvatarText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0284C7',
  },
  doctorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  doctorSpecialty: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    fontSize: 10,
    color: '#64748B',
  },
  doctorFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  reviewsCount: {
    fontSize: 10,
    color: '#94A3B8',
  },
  priceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  priceLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  priceValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  bookBtn: {
    backgroundColor: '#0284C7',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  bookBtnText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  emptyBox: {
    alignItems: 'center',
    padding: 30,
    gap: 10,
  },
  emptyText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  apptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  apptHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  apptDoctor: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  apptSpecialty: {
    fontSize: 11,
    color: '#64748B',
  },
  apptBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  apptBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0284C7',
  },
  apptDetailsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  apptDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  apptDetailText: {
    fontSize: 11,
    color: '#475569',
  },
  cancelApptBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  cancelApptText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#E11D48',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    gap: 4,
  },
  statNum: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0284C7',
  },
  statLabel: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  timeTag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  timeTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  scheduleName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  scheduleAct: {
    fontSize: 11,
    color: '#64748B',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  formTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    color: '#0F172A',
  },
  pickerRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  choiceChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  choiceChipActive: {
    backgroundColor: '#0284C7',
    borderColor: '#0284C7',
  },
  choiceChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  choiceChipTextActive: {
    color: '#FFFFFF',
  },
  submitOrderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#0284C7',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  submitOrderBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  subCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    gap: 10,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0284C7',
  },
  subPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
  },
  subDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  subActionBtn: {
    backgroundColor: '#0284C7',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  subActionBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  labHeaderBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5FF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    gap: 10,
  },
  labTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6B21A8',
  },
  labSubtitle: {
    fontSize: 11,
    color: '#9333EA',
    marginTop: 2,
  },
  labBadge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labOrderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  labOrderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  labOrderNum: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  labOrderDoc: {
    fontSize: 11,
    color: '#64748B',
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusTagText: {
    fontSize: 10,
    fontWeight: '800',
  },
  orderDetailBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    gap: 3,
  },
  orderDetailItem: {
    fontSize: 11,
    color: '#475569',
  },
  advanceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 8,
  },
  advanceBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    gap: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalDoctorSnippet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F0F9FF',
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
  },
  modalDoctorName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  modalDoctorSpec: {
    fontSize: 11,
    color: '#64748B',
  },
  slotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  slotChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  slotChipActive: {
    backgroundColor: '#0284C7',
  },
  slotChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  slotChipTextActive: {
    color: '#FFFFFF',
  },
  confirmBookingBtn: {
    backgroundColor: '#0284C7',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmBookingBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
