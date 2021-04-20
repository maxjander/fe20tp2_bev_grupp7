import { BsTrash } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

import {
  StyledEditButton,
  StyledUtilButtonContainer,
  StyledDeleteButton,
} from "../styledComponents";

const InventoryUtilButtons = ({
  onToggleEditMode,
  onRemoveCard,
  card,
  authUser,
}) => {
  return (
    <StyledUtilButtonContainer>
      <StyledEditButton onClick={onToggleEditMode}>
        <AiFillEdit />
      </StyledEditButton>
      <StyledDeleteButton onClick={() => onRemoveCard(card.uid, authUser)}>
        <BsTrash />
      </StyledDeleteButton>
    </StyledUtilButtonContainer>
  );
};

export default InventoryUtilButtons;
