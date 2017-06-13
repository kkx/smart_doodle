pragma solidity ^0.4.4;

contract DoodleVote {
    uint constant ITEM_PER_PAGE = 10;


	struct VoteEvent {
        bytes32 title;
		mapping (bytes32 => uint) proposals;
		bytes32[10] proposalsList;
        address[] voters;
	}

	mapping (address => VoteEvent) public voteEvents;
	mapping (address => address[]) public userEvents;

	event logUserEvents(uint value);

	function createEvent(bytes32 title, bytes32[10] proposalNames) returns(bool sufficient) {
		bytes32[10] memory proposalsList;
        address[] memory voters;

		for (uint i = 0; i < proposalNames.length; i++) {
            proposalsList[i] = proposalNames[i];
        }

        voteEvents[msg.sender] = VoteEvent({
            title: title,
            proposalsList: proposalsList,
            voters: voters
        });
		return true;
	}

	function vote(address eventAddress, bytes32[] proposalNames) returns(bool sufficient){
        
		VoteEvent voteEvent = voteEvents[eventAddress];
		// voted
        for (uint i = 0; i < voteEvent.voters.length; i++) {
            if (voteEvent.voters[i] == msg.sender){
                return false; 
            }
        }
        for (i = 0; i < proposalNames.length; i++) {
            voteEvents[eventAddress].proposals[proposalNames[i]] += 1;
        }

        voteEvent.voters.push(msg.sender);
        //record user voting history
        userEvents[msg.sender].push(eventAddress);
        logUserEvents(userEvents[msg.sender].length);
        return true;
	}

    function eventStatus(address eventAddress) constant returns(bytes32 title, bool isVoted, bytes32[10] proposalsList,  uint[10] proposalsScores){
		VoteEvent voteEvent = voteEvents[eventAddress];
		proposalsList = voteEvent.proposalsList;
		title = voteEvent.title;
		isVoted = false;
        for (uint i=0; i < voteEvent.voters.length; i++){
            if (voteEvent.voters[i] == msg.sender){
                isVoted = true; 
            }
		}
		for (i=0; i < proposalsList.length; i++){
	        if (proposalsList[i] != ''){
	            proposalsScores[i] = voteEvent.proposals[proposalsList[i]];
	        }
		}
    }

    function getUserEvents1() constant returns(address event_address){
        event_address = userEvents[msg.sender][0];
    }

    function getUserEvents(uint8 page) constant returns(address[10] event_addresses, bytes32[10] event_names){

        uint j=0;
        for (uint i = (page-1) * 10; i < (page-1) * 10 + 10; i++) {
            if (i < userEvents[msg.sender].length){
                address event_address = userEvents[msg.sender][i];
                event_addresses[j] = event_address;
                event_names[j] = voteEvents[event_address].title;
                j += 1;
            }
        }
    }
}
