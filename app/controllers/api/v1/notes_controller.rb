class Api::V1::NotesController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def create
        note = Note.new(note_params)
        if note.save
            render json: { note: note }
        else
            render json: { error: note.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def note_params
        params.require(:note).permit(:note, :user_id, :trail_id)
    end
end
