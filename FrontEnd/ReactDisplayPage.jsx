import React from "react";
import { Fragment } from "react";
import PetsList from "./PetsList";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as petServices from "../../services/petServices";

import { withRouter } from "react-router-dom";
import ContentWrapper from "../Layout/ContentWrapper";
import PetsForm from "../Pets/PetsForm";
import PetsCard from "../Pets/PetsCard";
class Pets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
      petData: [],
      petProfile: [],
      modal: false,
      breedList: []
    };
  }

  shouldComponentUpdate(nextState, nextProps) {
    return this.state.modal !== nextState;
  }
  componentDidMount = () => {
    petServices
      .getAll()
      .then(this.onResponse)
      .catch(this.onError);

    petServices
      .getPetWithBreed()
      .then(this.onBreedResponse)
      .catch(this.onError);
  };

  onError = response => {
    console.log(response, "Error on load");
  };

  onResponse = response => {
    console.log(response, "Success");

    this.setState({
      pets: response.data.items
    });
  };

  onBreedResponse = response => {
    console.log(response, "Success");

    this.setState({
      breedList: response.data.items
    });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  pToggle = () => {
    this.setState({ pModal: !this.state.pModal });
  };

  handleProfileEdit = item => {
    this.setState({
      modal: !this.state.modal,
      petData: item
    });
  };

  handleEditFromModal = item => {
    this.setState({
      modal: !this.state.modal,
      petData: item
    });
  };

  handleSingleProfileDisplay = item => {
    this.setState({
      pModal: !this.state.pModal,
      petProfile: item
    });
  };

  render() {
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );
    const closeBtn2 = (
      <button className="close" onClick={this.pToggle}>
        &times;
      </button>
    );

    return (
      <ContentWrapper>
        <div className="d-flex content-heading">Pets</div>
        <Fragment>
          <PetsList
            {...this.props}
            {...this.state}
            editPetProfile={this.handleProfileEdit}
            displaySingleProfile={this.handleSingleProfileDisplay}
            editFromModal={this.handleEditFromModal}
            pets={this.state.pets || []}
            pets2={this.state.breedList || []}
          />
          {this.state.petData && (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle} close={closeBtn} />
              <ModalBody>
                <PetsForm {...this.state} {...this.props} />
              </ModalBody>
              <ModalFooter />
            </Modal>
          )}

          {this.state.petProfile && (
            <Modal
              isOpen={this.state.pModal}
              toggle={this.pToggle}
              className="d-flex justify-content-center"
            >
              <ModalHeader toggle={this.pToggle} close={closeBtn2}>
                Pet Profile
              </ModalHeader>

              <PetsCard
                {...this.props}
                profileData={[this.state.petProfile]}
                editPetProfile={this.handleProfileEdit}
              />
            </Modal>
          )}
        </Fragment>
      </ContentWrapper>
    );
  }
}
export default withRouter(Pets);
