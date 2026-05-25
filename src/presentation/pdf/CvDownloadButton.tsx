import { PDFDownloadLink } from "@react-pdf/renderer"
import { DownloadSimpleIcon } from "@phosphor-icons/react"
import { CvDocument } from "./CvDocument"
import type { Language } from "@/domain/value-objects/Language"
import type { Translations } from "@/i18n/pt"

const FILENAME: Record<Language, string> = {
  pt: "lucas-pedro-da-hora-curriculo.pdf",
  en: "lucas-pedro-da-hora-resume.pdf",
  es: "lucas-pedro-da-hora-curriculum.pdf",
  fr: "lucas-pedro-da-hora-cv.pdf",
}

interface CvDownloadButtonProps {
  language: Language
  t: Translations
}

export function CvDownloadButton({ language, t }: CvDownloadButtonProps) {
  return (
    <PDFDownloadLink
      document={<CvDocument language={language} t={t} />}
      fileName={FILENAME[language]}
    >
      {({ loading }) => (
        <button
          disabled={loading}
          className="flex items-center gap-1.5 rounded-sm border border-(--accent)/40 bg-(--accent)/8 px-3 py-1.5 text-[11px] text-(--accent) transition-all hover:border-(--accent)/70 hover:bg-(--accent)/15 disabled:cursor-wait disabled:opacity-60"
        >
          <DownloadSimpleIcon size={13} />
          {loading ? t.cv.download_loading : t.cv.download}
        </button>
      )}
    </PDFDownloadLink>
  )
}
