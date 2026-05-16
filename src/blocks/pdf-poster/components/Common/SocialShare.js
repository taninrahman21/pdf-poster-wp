import FacebookIcon from "../../../../icons/Facebook";
import LinkedinIcon from "../../../../icons/Linkedin";
import PinterestIcon from "../../../../icons/Pinterest";
import XIcon from "../../../../icons/X";

const SocialShare = ({ attributes }) => {
  const { socialShare } = attributes;
  const { enabled, facebook, twitter, linkedin, pinterest, position } = socialShare;

  if (!enabled) {
    return null;
  }
  return (
    <div className={`pdfp_social_share pdfp_social_icon_${position}`}>
      {facebook && <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer"><FacebookIcon height="40px" width="40px" /></a>}
      {twitter && <a href={`https://twitter.com/intent/tweet?text=${window.location.href}`} target="_blank" rel="noopener noreferrer"><XIcon height="40px" width="40px" /></a>}
      {linkedin && <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`} target="_blank" rel="noopener noreferrer"><LinkedinIcon height="40px" width="40px" /></a>}
      {pinterest && <a href={`https://pinterest.com/pin/create/button/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer"><PinterestIcon height="40px" width="40px" /></a>}
    </div>
  );
};

export default SocialShare;