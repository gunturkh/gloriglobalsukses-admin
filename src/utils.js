const daysToSendReminderDefaultValue = (trackingData) => {
  const { daysToSendReminder, setDaysReminderManually, status } = trackingData
  switch (status) {
    case 'SUDAH DIPESAN DAN BARANG READY':
      return setDaysReminderManually ? daysToSendReminder : 1

    case 'SUDAH DIPESAN DAN BARANG PRODUKSI':
      return setDaysReminderManually ? daysToSendReminder : 7

    case 'SUDAH DIKIRIM VENDOR KE GUDANG CHINA':
      return setDaysReminderManually ? daysToSendReminder : 4

    case 'SUDAH TIBA DIGUDANG CHINA':
      return setDaysReminderManually ? daysToSendReminder : 3

    case 'BARANG LOADING BATAM - JAKARTA':
      return setDaysReminderManually ? daysToSendReminder : 7

    case 'BARANG KOMPLIT ITEM & BELUM CLEAR DP':
      return setDaysReminderManually ? daysToSendReminder : 1

    case 'BARANG KOMPLIT ITEM & SUDAH CLEAR DP':
      return setDaysReminderManually ? daysToSendReminder : 1000

    case 'DELAY - RANDOM CHECK CHINA':
      return setDaysReminderManually ? daysToSendReminder : 1

    default:
      return setDaysReminderManually ? daysToSendReminder : 1
  }
};
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
};

export {
  daysToSendReminderDefaultValue,
  rupiah
}
