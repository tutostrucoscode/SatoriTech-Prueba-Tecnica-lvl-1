import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Character } from "../../../api/RickAndMortyAPI";

type Props = {
  isOpen: boolean;
  onClose(): void;
  selectedResident: Character | null;
};

const ModalUi = ({ isOpen, onClose, selectedResident }: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedResident?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Aquí puedes incluir toda la información del personaje que quieras mostrar */}
            <Image src={selectedResident?.image} borderRadius="md" />
            <Box mt={4}>
              <p>
                <strong>Status:</strong> {selectedResident?.status}
              </p>
              <p>
                <strong>Species:</strong> {selectedResident?.species}
              </p>
              <p>
                <strong>Origin:</strong> {selectedResident?.origin.name}
              </p>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalUi;
