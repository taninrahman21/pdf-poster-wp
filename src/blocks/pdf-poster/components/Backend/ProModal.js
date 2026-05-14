import { Modal } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { PDFIcon } from "../../../../icons/PDF";
import LockForProModal from "../../../../icons/LockForProModal";
import External from "../../../../icons/External";

const ProModal = ({ open, setOpen }) => {

    if (!open) return null;
    return (
        <Modal title={<div className="pdfp-panel-icon">{PDFIcon} {__('Upgrade to PRO', 'pdfp')}</div>} onRequestClose={() => {
            setOpen(false)
        }} isOpen={open}>
            <div className="pdfp-upgrade-modal">
                <div className="pdfp-upgrade-modal-icon">
                    <LockForProModal width="200px" height="200px" />
                </div>
                <div className="pdfp-upgrade-modal-content">
                    <h2>{__('Unlock all the pro features with PRO version', 'pdfp')}</h2>
                    <p>{__('You’re just one step away from using this premium feature. Upgrade your plan to access powerful tools, priority support, and more.', 'pdfp')}</p>
                    <a className="button button-primary" href="/wp-admin/admin.php?page=pdf-poster-pricing" target="_blank" rel="noopener noreferrer">Upgrade to Pro <External fill={"#fff"} /></a>
                </div>
            </div>
        </Modal>
    )
}

export default ProModal