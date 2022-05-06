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

    case 'BARANG LOADING KE BATAM':
      return setDaysReminderManually ? daysToSendReminder : 7

    case 'BARANG KOMPLIT ITEM & BELUM CLEAR DP':
      return setDaysReminderManually ? daysToSendReminder : 1

    case 'BARANG KOMPLIT ITEM & SUDAH CLEAR DP':
      return setDaysReminderManually ? daysToSendReminder : 1

    case 'DELAY - RANDOM CHECK CHINA':
      return setDaysReminderManually ? daysToSendReminder : 1

    default:
      return setDaysReminderManually ? daysToSendReminder : 1
  }
};

export {
  daysToSendReminderDefaultValue
}
